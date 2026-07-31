# 人形机器人开源生态导航

> 每个条目标注了**开源内容到底是什么**——代码？模型权重？硬件图纸？数据集？一目了然。
> 收录 45 款平台、14 款仿真器、14 个训练框架、21 个 VLA 模型。

**🌐 在线访问**：[bbhliheyi.github.io/humanoid-eco-nav](https://bbhliheyi.github.io/humanoid-eco-nav)

---

## Phase 1: 数字孪生

> 仿真器 + URDF + RL 训练耦合推进。先在数字世界让机器人走起来。

### 仿真引擎

**[Isaac Sim](https://developer.nvidia.com/isaac/sim)** — NVIDIA
开源内容：SDK / Python API / Extensions 开源，核心 PhysX 5 渲染引擎免费但闭源

**[MuJoCo / MJX](https://github.com/google-deepmind/mujoco)** — Google DeepMind
开源内容：完整 C 源码 + Python bindings + JAX GPU 加速(MJX) + 可微分物理 + MJPC 实时 MPC 求解器，Apache-2.0

**[Genesis World](https://github.com/Genesis-Embodied-AI/genesis-world)** — 社区
开源内容：统一物理引擎(刚体/柔体/流体/气体)全部源码，GPU 加速，全可微分，Apache-2.0

**[Gazebo](https://gazebosim.org)** — Open Robotics
开源内容：完整 C++ 源码 + ROS2 插件生态 + SDFormat 场景格式，多物理后端可选(ODE/Bullet/DART)，Apache-2.0

**[Newton](https://developer.nvidia.com/physx-sdk)** — NVIDIA
开源内容：PhysX 5 SDK 免费使用，核心闭源，NVIDIA EULA

**[Genie Sim 3.0](https://github.com/AgibotTech/genie_sim)** — 智元
开源内容：LLM 驱动场景生成 Python 代码 + 示例场景，Apache-2.0

**[LingBot-World 2.0](https://opensource.antgroup.com)** — 蚂蚁灵波
开源内容：14B MoE 世界模型权重 + 推理代码，Custom Open License

**[格物 Gewu](https://openloong.openatom.cn)** — 国地中心
开源内容：Unity RL Playground 场景 + 青龙/灵龙 URDF + ML-Agents 训练配置，OpenAtom

**[RoboCasa / HumanoidBench](https://github.com/robocasa/robocasa)** — UT Austin/Stanford
开源内容：100+ 家庭场景 MuJoCo 模型 + 27 项标准化评估协议 + Baseline 代码，MIT

**[WorldGen](https://github.com/svl-stanford/worldgen)** — Stanford
开源内容：DiT 3D 场景生成模型权重 + 推理代码 + 物理碰撞自动生成，Apache-2.0

**[RaiSim](https://raisim.com)** — ETH Zurich
开源内容：Python/C++ API 学术免费，核心商用授权，高速接触动力学引擎

**[Unitree MuJoCo Sim](https://github.com/unitreerobotics/unitree_mujoco)** — 宇树
开源内容：H1/G1/Go2 MJCF 模型 + MuJoCo 场景 + unitree_sdk2 集成 + 地形生成器，BSD-3

**[Unitree Isaac Lab Sim](https://github.com/unitreerobotics/unitree_sim_isaaclab)** — 宇树
开源内容：H1/G1 Isaac Lab 环境 + 数据采集回放 + 模型验证工具，BSD-3

**[EmbodiedGen](https://github.com/HorizonRobotics/EmbodiedGen)** — 地平线
开源内容：文字/照片→3D 场景生成代码 + 多仿真后端导出(Isaac/MuJoCo/SAPIEN/Genesis)，Apache-2.0

### 训练框架

**[Isaac Lab](https://github.com/isaac-sim/IsaacLab)** — NVIDIA
开源内容：完整 Python 训练框架源码(Obs/Reward/DomainRand Manager + PPO/SAC 实现) + ONNX/TensorRT 导出 + ROS2 部署示例，Apache-2.0

**[legged_gym](https://github.com/leggedrobotics/legged_gym)** — ETH Zurich
开源内容：极简单文件训练脚本(PPO+GAE+域随机化) + 四足/人形 URDF 示例，BSD-3

**[MuJoCo Playground](https://github.com/google-deepmind/mujoco_playground)** — DeepMind
开源内容：纯 JAX PPO 训练代码(GPU 端到端) + 人形步态示例，Apache-2.0

**[unitree_rl_gym](https://github.com/unitreerobotics/unitree_rl_gym)** — 宇树
开源内容：G1/H1 完整训练代码(Train→Play→Sim2Sim→Sim2Real) + 域随机化配置 + ONNX 导出 + ROS2 部署示例，BSD-3

**[Humanoid-Gym](https://github.com/roboterax/humanoid-gym)** — 星动纪元
开源内容：Sim2Sim 校验框架(Isaac Gym→MuJoCo 自动对比) + XBot URDF + 零样本部署代码，MIT

**[HumanoidVerse](https://github.com/LeCAR-Lab/HumanoidVerse)** — 上交
开源内容：多仿真器统一训练接口(Isaac/Genesis 一键切换) + Sim2Sim 校验，MIT

**[skrl](https://github.com/Toni-SM/skrl)** — 社区
开源内容：PPO/SAC/TD3 多算法实现 + PyTorch/JAX/Warp 三后端 + Isaac Lab/MuJoCo Playground 集成示例，MIT

**[ASAP](https://github.com/LeCAR-Lab/ASAP)** — LeCAR-Lab (RSS 2025)
开源内容：Delta Action Model 在线残差学习代码 + 真机数据采集 + 微调流程，MIT

**[Eureka / DrEureka](https://github.com/eureka-research/eureka)** — NVIDIA
开源内容：LLM(GPT-4)自动生成奖励函数代码 + 进化搜索算法 + DrEureka 域随机化参数自动设计，MIT

**[AMP / DeepMimic](https://xbpeng.github.io/projects/AMP)** — SFU/Berkeley
开源内容：对抗运动先验(AMP)训练代码 + 动捕数据预处理 + 拟人步态风格判别器，BSD-3

**[DIAL-MPC](https://github.com/LeCAR-Lab/dial-mpc)** — LeCAR-Lab
开源内容：GPU 采样 MPC 求解器源码(无需 RL 训练) + MuJoCo 示例，MIT

**[GR00T-VisualSim2Real](https://github.com/NVlabs/GR00T-VisualSim2Real)** — NVIDIA (CVPR 2026)
开源内容：Teacher-Student DAgger 蒸馏代码 + PPO 教师训练 + ONNX 导出 + G1 真机验证，Apache-2.0

**[Genesis-Humanoid](https://github.com/UMass-Embodied-AGI/Genesis-Humanoid)** — UMass
开源内容：Genesis 上的一体化人形训练代码(PPO+BC+遥操作) + 8192 envs 并行配置，Apache-2.0

**[ManiSkill3](https://github.com/haosulab/ManiSkill)** — Hillbot
开源内容：GPU 并行仿真环境 + PPO/SAC/TD-MPC2 Baseline + Sim2Real 示例 + 人形任务，Apache-2.0

---

## Phase 2: 硬件驱动

> 每个平台标注了开源内容——是图纸？是 SDK？是 BOM 清单？还是全部？

### 全开源平台（硬件+软件全开放）

**[RoboParty roboto_origin](https://github.com/Roboparty/roboto_origin)** — ¥3.5万
开源内容：全套机械 CAD 图纸 + PCB 电路文件 + EBOM 物料清单 + SOP 装配手册 + atom01 软件栈 + Party OS，可直接在淘宝购买全部零件自行组装。Apache-2.0
> 达妙 DM4310 BLDC(腿) + 飞特 STS3215 舵机(臂) + 树莓派4B+STM32F407 + ICM-20948 + CAN + 24V 6S LiPo

**[AgiBot X1 / 灵犀 X1](https://github.com/AgibotTech/agibot_x1)** — 智元机器人
开源内容：完整硬件设计资料(CAD/PCB/装配图) + RL 训练代码(infer/train/hardware 三个独立仓库) + AimRT 中间件 + 灵渠 OS 系统内核。Apache-2.0

**[OpenLoong 青龙](https://openloong.openatom.cn)** — 国地中心
开源内容：全套机械图纸 + 电控方案 + 青龙/灵龙 URDF + 龙腾 2.0B 模型 + 格物 Unity 仿真 + OpenAtom 基金会托管

**[Fourier N1](https://github.com/FFTAI)** — 傅利叶智能
开源内容：结构蓝图 + 装配指南 + 硬件规格说明 + Python 控制 SDK + RL 训练示例。Apache-2.0

**[Berkeley Humanoid Lite](https://github.com/hybridrobotics/berkeley-humanoid-lite)** — UC Berkeley
开源内容：3D 打印 STL 文件 + 齿轮箱 CAD + 电路原理图 + Isaac Lab 步态训练代码 + 遥操作代码。MIT

**[LeRobot Humanoid](https://github.com/huggingface/lerobot)** — HuggingFace
开源内容：3D 打印 STL 文件 + 标准件 BOM + LeRobot Python 录制/训练/推理代码 + ACT/Diffusion/Flow Matching 策略。Apache-2.0

**[Asimov v0/v1](https://github.com/asimovinc/asimov-1)** — Menlo Research
开源内容：机械 CAD + 电气 CAD + Isaac Sim 仿真模型 + 板载控制固件 + 组装说明。MIT

**[Unitree Qmini](https://github.com/unitreerobotics/Qmini)** — 宇树
开源内容：BOM 物料清单 + 装配指南 + RoboTamer4Qmini 控制框架 + URDF 模型。BSD-3

**[TienKung 天工](https://github.com/Open-X-Humanoid)** — 国地中心
开源内容：URDF 模型 + TienKung-Lab 训练框架(IsaacLab+AMP) + LeRobot 集成。Apache-2.0

**[K-Bot](https://github.com/kscalelabs/kbot)** — K-Scale Labs(已停运)
开源内容：全套硬件 CAD + 软件源码 + Python SDK + 组装文档。MIT

**[Reachy 2](https://pollen-robotics.com/reachy-2)** — Pollen Robotics(HuggingFace收购)
开源内容：双臂 CAD + ROS2 Humble 驱动包 + VR 遥操作代码 + Python SDK。Apache-2.0

**[OpenArm](https://github.com/enactic/OpenArm)** — Enactic
开源内容：双臂 CAD + 固件源码 + LeRobot 集成 + 双向力反馈遥操作代码。MIT

### 半开源平台（SDK/软件开源，本体闭源）

- **[Unitree H1/H1-2](https://www.unitree.com/h1)**：SDK(unitree_sdk2) + RL 训练框架(unitree_rl_gym) + ROS2 包 开源，本体硬件闭源
- **[Unitree G1](https://www.unitree.com/g1)**：同上 + UnifoLM-VLA 模型开源
- **[Booster T1/K1](https://boosterobotics.com)**：Booster Gym/Train/Studio IDE 开源，本体闭源
- **[EngineAI SA01/PM01](https://github.com/engineai-robotics)**：端到端神经网络控制代码 + URDF 开源，硬件部分闭源
- **[Fourier GR-2](https://www.fftai.com)**：第二代商用，N1 资料开源，GR-2 闭源
- **[RobotEra XBot](https://www.robotera.com)**：Humanoid-Gym 训练框架开源(MIT)，本体闭源

### 商用闭源平台（仅产品信息，无开源内容）

Tesla Optimus · Figure 02 · Atlas · 1X Neo · Digit · Apollo · UBTech Walker S · Xiaomi CyberOne · 达闼 XR4 · 乐聚 KUAVO · Kepler · 星海图 G0 · 逐际动力 CL-1 · 魔法原子 · 银河通用 G1 · 众擎 SE01 · 松延 N2 · PAL TALOS · Kawasaki Kaleido · Toyota T-HR3 · Phoenix · MenteeBot · Rainbow RB-Y1 · 腾讯 Robotics X · XPeng IRON · Dreame

---

## Phase 3: 算法智能

### 真机控制与通信

**[unitree_sdk2](https://github.com/unitreerobotics/unitree_sdk2)** — 宇树
开源内容：CycloneDDS 通信层 C++/Python 完整源码 + ROS2 Humble 集成 + H1/G1/Go2 驱动。BSD-3

**[GR00T-WBC](https://github.com/NVlabs/GR00T-WholeBodyControl)** — NVIDIA
开源内容：QP 优化全身力矩控制器 C++ 源码 + 解耦 WBC 算法 + Isaac Sim 示例。Apache-2.0

**[OCS2 + Pinocchio](https://github.com/leggedrobotics/ocs2)** — ETH Zurich
开源内容：非线性 MPC 完整 C++ 源码(OCS2) + 高效刚体动力学算法库(Pinocchio) + ros_control 集成。BSD-3

**[AimRT](https://github.com/AimRT/AimRT)** — 智元
开源内容：高性能中间件 C++ 源码 + ROS2/HTTP/gRPC 多协议兼容 + 插件扩展机制。Apache-2.0

**[Open-TeleVision](https://github.com/OpenTeleVision/TeleVision)** — UCSD+MIT
开源内容：Apple Vision Pro 遥操作 Python 完整代码 + 立体视觉追踪 + 关节重定向 + ROS2 桥接。MIT

**[ALOHA / Mobile ALOHA](https://mobile-aloha.github.io)** — Stanford
开源内容：双臂硬件 CAD + ACT 训练/推理代码 + 遥操作采集脚本 + 数据集。MIT

**[Unitree XR Teleop](https://github.com/unitreerobotics/xr_teleoperate)** — 宇树
开源内容：Apple Vision Pro / Meta Quest 遥操作代码 + H1/G1 灵巧手适配。BSD-3

**[OpenWBT](https://github.com/GalaxyGeneralRobots/OpenWBT)** — 银河通用+清华
开源内容：AVP 全身遥操作代码(行走+下蹲+弯腰+抓取) + G1/H1 适配。MIT

**[MIT Cheetah](https://github.com/mit-biomimetics/Cheetah-Software)** — MIT
开源内容：凸优化 MPC + WBC QP + 卡尔曼状态估计 C++ 完整源码，人形控制算法的经典参考实现。MIT

**[Solo12 / ODRI](https://github.com/open-dynamic-robot-initiative)** — MPI/NYU
开源内容：BLDC 关节模组硬件 CAD + 固件 + Pinocchio/TSID WBC 控制代码 + ROS2。BSD-3

**[CHAMP](https://github.com/chvmp/champ)** — 社区
开源内容：FSM+MPC+WBC 分层四足控制 ROS 包完整源码 + Gazebo/MuJoCo 仿真。BSD-3

**[Deep Robotics SDK](https://github.com/DeepRobotics)** — 深度波动
开源内容：Python/C++ SDK + RL 训练示例，本体闭源。Apache-2.0(示例)

### VLA 具身大脑

每个条目标注开源了什么：模型权重？训练代码？推理代码？微调工具？

**[Isaac GR00T N1.7](https://github.com/Nvidia/Isaac-GR00T)** — NVIDIA
开源：完整模型权重(快慢双系统) + 推理代码 + TensorRT 部署 + EgoScale 数据集。Apache-2.0 可商用

**[openpi π0/π0.5](https://github.com/Physical-Intelligence/openpi)** — Physical Intelligence
开源：Flow Matching 模型权重 + 推理代码 + 微调工具链 + 多平台 Checkpoint。Apache-2.0

**[Psi-Zero Ψ0](https://github.com/physical-superintelligence-lab/Psi0)** — USC
开源：Loco-Manipulation 模型权重 + 训练/推理代码 + G1/H1 真机部署。RSS 2026。MIT

**[LingBot-VLA 2.0](https://github.com/Robbyant/lingbot-vla)** — 蚂蚁灵波
开源：跨本体 VLA 后训练框架 + LoRA 适配代码 + 17 厂商配置文件。Apache-2.0

**[HEX VLA](https://github.com/Open-X-Humanoid/HEX)** — Open-X-Humanoid
开源：Qwen-VL+流匹配动作头完整代码 + 12M 帧预训练数据。Apache-2.0

**[HoloMotion](https://github.com/HorizonRobotics/HoloMotion)** — 地平线
开源：MoE Transformer 全身控制模型权重 + 推理代码。Apache-2.0

**[UnifoLM-VLA](https://github.com/unitreerobotics/unifolm-vla)** — 宇树
开源：VLA 模型权重 + 推理代码 + WMA-0 世界模型 + G1 29-DoF 映射。BSD-3

**[Dexora](https://github.com/dexoravla/Dexora)** — 清华
开源：36-DoF 灵巧手 VLA 模型 + 分布式注意力架构代码 + 100K 仿真数据。ICRA 2026。MIT

**[RDT-1B/RDT2](https://github.com/thu-ml/RDT2)** — 清华
开源：1.2B 扩散/流匹配模型权重 + 46 数据集预处理 + 训练/微调代码。Apache-2.0

**[GEAR-SONIC](https://huggingface.co/nvidia/GEAR-SONIC)** — NVIDIA
开源：1.2M-42M 行为模型权重 + HuggingFace 推理。Apache-2.0

**[GO-1/GO-2](https://github.com/AgibotTech)** — 智元
开源：ViLLA VLA 推理代码 + InternVL-2B 视觉主干 + 隐式动作标记。Apache-2.0

**[NVIDIA Cosmos](https://github.com/nvidia/Cosmos)** — NVIDIA
开源：世界模型权重(Transfer+Predict) + 推理 + Post-training 脚本。OpenMDW-1.1

**[Oasis](https://github.com/decart-ai/oasis)** — Decart
开源：500M/1.2B 交互式世界模型权重 + PyTorch 推理。MIT

**[DexVLA](https://github.com/juruobenruo/DexVLA)** — 多机构
开源：Qwen2-VL 基座 VLA 权重 + 单臂/双臂/灵巧手统一推理代码。Apache-2.0

**[WholebodyVLA](https://github.com/OpenDriveLab/WholebodyVLA)** — 上海AI Lab
开源：全身移动操作 VLA 权重 + 潜空间统一表征代码。ICLR 2026。Apache-2.0

**[X-VLA](https://github.com/2toinf/X-VLA)** — 2toinf
开源：Soft-Prompt 跨本体适配代码 + 预训练权重。AgiBot Challenge 冠军。ICLR 2026。Apache-2.0

**[InternVLA-M1](https://github.com/InternRobotics/InternVLA-M1)** — 上海AI Lab
开源：Qwen2.5-VL 空间引导 VLA 权重 + 推理代码。MIT

**[DexGraspVLA](https://github.com/Psi-Robot/DexGraspVLA)** — 灵初+北大
开源：VLM 规划器+扩散控制器分层代码 + >90% 抓取成功率。AAAI 2026 Oral。Apache-2.0

**[GalaxeaVLA](https://github.com/OpenGalaxea/GalaxeaVLA)** — 星海图
开源：双系统 VLA 模型 + Fast-WAM + 500h 开放场景数据集。Apache-2.0

### 训练数据集

每个标注了数据规模、格式和采集方式。

**[AgiBot World](https://agibot-world.com)** — 智元
开源内容：百万级真机轨迹(RGB+关节+力矩+音频)，100%真实物理场景，CC BY-NC 4.0

**[RoboMIND V2.0](https://huggingface.co/datasets/x-humanoid-robomind/RoboMIND)** — 国地中心
开源内容：400K+ 轨迹，6 种本体 739 项任务，含阵列触觉数据，Apache-2.0

**[Humanoid Everyday](https://github.com/physical-superintelligence-lab/Humanoid-Everyday)** — USC
开源内容：10.3K 轨迹/300 万帧，9 模态(RGB/Depth/LiDAR/Tactile/IMU/Audio)，G1/H1 采集，MIT

**[Open X-Embodiment](https://github.com/google-deepmind/open_x_embodiment)** — DeepMind+21 机构
开源内容：100 万+ Episodes，22 种机器人形态统一 RLDS 格式，CC BY 4.0

**[EgoScale](https://arxiv.org)** — NVIDIA
开源内容：2 万小时人类第一人称动作视频，验证 Log-linear Scaling Law，Apache-2.0

**[Unitree G1 Dataset](https://huggingface.co/UnitreeRobotics)** — 宇树
开源内容：数万条真机操作轨迹(拧瓶盖/倒水/叠衣服)，29-DoF 姿态+视觉，BSD-3

**[DROID](https://droid-dataset.github.io)** — Stanford/Berkeley/CMU
开源内容：76K+ 轨迹，18 实验室 86 场景，多角度 RGB/Depth/力矩，MIT

**[LeRobot Hub](https://huggingface.co/lerobot)** — HuggingFace
开源内容：社区数千条双臂/双手/人形示教数据，ACT/Diffusion/VQ-BeT 格式，Apache-2.0

---

## Phase 4: 测试部署 + 参考

### 技术百科

18 个术语，按**机械结构→嵌入式硬件→嵌入式软件→仿真→算法→神经网络→VLA**树形组织，含公式和论文引用。

**机械结构**：关节重定向 · **嵌入式硬件**：驱动关节电机(BLDC/舵机/QDD三种对比+厂商) · 主控计算(Jetson/STM32/树莓派) · IMU(ICM-20948/BMI088/MPU6050对比) · 通信总线(CAN/EtherCAT/ROS2 DDS三层) · **嵌入式软件**：实时控制与中间件(FOC→WBC→MPC调用链) · **仿真**：仿真器全景对比(MuJoCo/Isaac/Genesis/Gazebo/Newton) · Sim2Real迁移(5种方法) · 域随机化 · **强化学习**：Actor-Critic · PPO · SAC · TRPO · GAE · 扩散策略 · 流匹配 · 非对称AC · **神经网络**：MLP · Transformer · MoE · **激活函数**：ELU/ReLU/GELU/SiLU · **基础设施**：GPU并行化训练 · WBC全身控制 · **VLA**：VLA范式(端到端/分层/解耦) · 遥操作数据采集(6种方案对比)

### 核心论文(33篇)

**Sim2Real**：legged_gym(Science Robotics 2022) · Humanoid-Gym(CoRL 2024) · ASAP(RSS 2025) · DrEureka(RSS 2024) · Isaac Gym(NeurIPS 2021) · Genesis(2024) · LucidSim(CoRL 2024)

**VLA**：RT-2(CoRL 2023) · RT-1(RSS 2023) · Octo(RSS 2024) · Gato(2022) · Diffusion Policy(RSS 2023) · GR00T N1(2025) · π0(2024) · EgoScale(CVPR 2025)

**全身控制**：HumanPlus(CoRL 2024) · OmniH2O(CoRL 2024) · Mobile ALOHA(2024) · ACT(CoRL 2023) · UMI(RSS 2024) · H2O(CoRL 2023)

**综述**：[Awesome Humanoid 550+ Papers](https://github.com/YanjieZe/awesome-humanoid-robot-learning) · Sim2Real Survey(T-RO 2023) · VLA Survey(2025) · Humanoid Survey(AR 2025)

---

## 本地运行

```bash
git clone https://github.com/bbhliheyi/humanoid-eco-nav.git
cd humanoid-eco-nav && npm install && npm run dev
```
