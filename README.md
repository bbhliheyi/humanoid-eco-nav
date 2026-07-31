# 🤖 人形机器人开源生态导航

> 每个项目标注了**开源内容到底是什么**——代码？模型权重？硬件图纸？数据集？

**🌐 在线访问**：[bbhliheyi.github.io/humanoid-eco-nav](https://bbhliheyi.github.io/humanoid-eco-nav)
**📦 源码仓库**：[github.com/bbhliheyi/humanoid-eco-nav](https://github.com/bbhliheyi/humanoid-eco-nav)

---

## Phase 1: 数字孪生

> 仿真器 + URDF + RL 训练耦合推进。先在数字世界让机器人走起来。

### 仿真引擎 (14)

| 项目 | 机构 | 开源内容 |
|------|------|---------|
| [Isaac Sim](https://developer.nvidia.com/isaac/sim) | NVIDIA | SDK / Python API / Extensions 开源，PhysX 5 核心引擎免费但闭源 |
| [MuJoCo / MJX](https://github.com/google-deepmind/mujoco) | DeepMind | 完整 C 源码 + Python + JAX GPU + 可微分物理 + MJPC，Apache-2.0 |
| [Genesis World](https://github.com/Genesis-Embodied-AI/genesis-world) | 社区 | 统一物理引擎全源码(刚体/柔体/流体/气体)，GPU加速，全可微，Apache-2.0 |
| [Gazebo](https://gazebosim.org) | Open Robotics | 完整 C++ 源码 + ROS2 插件生态，多物理后端(ODE/Bullet/DART)，Apache-2.0 |
| [Newton](https://developer.nvidia.com/physx-sdk) | NVIDIA | PhysX 5 SDK 免费使用，核心闭源，NVIDIA EULA |
| [Genie Sim 3.0](https://github.com/AgibotTech/genie_sim) | 智元 | LLM 驱动场景生成 Python 代码 + 示例，Apache-2.0 |
| [LingBot-World 2.0](https://opensource.antgroup.com) | 蚂蚁灵波 | 14B MoE 世界模型权重 + 推理代码，720P/60fps |
| [格物 Gewu](https://openloong.openatom.cn) | 国地中心 | Unity RL Playground + 青龙/灵龙 URDF + ML-Agents 配置，OpenAtom |
| [RoboCasa / HumanoidBench](https://github.com/robocasa/robocasa) | UT Austin | 100+ 场景 MuJoCo 模型 + 27 项评估协议 + Baseline，MIT |
| [WorldGen](https://github.com/svl-stanford/worldgen) | Stanford | DiT 3D 场景生成模型权重 + 推理 + 物理碰撞生成，Apache-2.0 |
| [RaiSim](https://raisim.com) | ETH | Python/C++ API 学术免费，核心商用授权，比 MuJoCo 快 3-5 倍 |
| [Unitree MuJoCo Sim](https://github.com/unitreerobotics/unitree_mujoco) | 宇树 | H1/G1/Go2 MJCF 模型 + MuJoCo 场景 + SDK2 集成 + 地形生成，BSD-3 |
| [Unitree Isaac Lab Sim](https://github.com/unitreerobotics/unitree_sim_isaaclab) | 宇树 | H1/G1 Isaac Lab 环境 + 数据采集回放 + 模型验证，BSD-3 |
| [EmbodiedGen](https://github.com/HorizonRobotics/EmbodiedGen) | 地平线 | 文字/照片→3D 场景生成代码 + 多仿真后端导出，Apache-2.0 |

### 训练框架 (14)

| 项目 | 机构 | 开源内容 | 许可 |
|------|------|---------|------|
| [Isaac Lab](https://github.com/isaac-sim/IsaacLab) | NVIDIA | 完整 Python 训练框架(Obs/Reward/DomainRand Manager + PPO/SAC) + ONNX/TensorRT 导出 + ROS2 部署 | Apache-2.0 |
| [legged_gym](https://github.com/leggedrobotics/legged_gym) | ETH | 极简单文件 PPO+GAE+域随机化训练脚本 + 四足/人形 URDF | BSD-3 |
| [MuJoCo Playground](https://github.com/google-deepmind/mujoco_playground) | DeepMind | 纯 JAX GPU PPO 代码(端到端) + 人形步态示例，单卡数分钟训练 | Apache-2.0 |
| [unitree_rl_gym](https://github.com/unitreerobotics/unitree_rl_gym) | 宇树 | G1/H1 完整 Train→Play→Sim2Sim→Sim2Real 代码 + ONNX导出 + ROS2部署 | BSD-3 |
| [Humanoid-Gym](https://github.com/roboterax/humanoid-gym) | 星动纪元 | Sim2Sim 校验框架(Isaac→MuJoCo 自动对比) + XBot URDF + 零样本部署 | MIT |
| [HumanoidVerse](https://github.com/LeCAR-Lab/HumanoidVerse) | 上交 | 多仿真器统一接口(Isaac/Genesis 一键切换) + Sim2Sim 校验 | MIT |
| [skrl](https://github.com/Toni-SM/skrl) | 社区 | PPO/SAC/TD3 多算法 + PyTorch/JAX/Warp 三后端 + Isaac/MuJoCo 示例 | MIT |
| [ASAP](https://github.com/LeCAR-Lab/ASAP) | LeCAR-Lab | Delta Action Model 在线残差学习 + 真机微调流程 (RSS 2025) | MIT |
| [Eureka / DrEureka](https://github.com/eureka-research/eureka) | NVIDIA | LLM 自动生成奖励函数 + 进化搜索 + 域随机化参数自动设计 | MIT |
| [AMP / DeepMimic](https://xbpeng.github.io/projects/AMP) | SFU/Berkeley | 对抗运动先验训练代码 + 动捕预处理 + 拟人步态判别器 | BSD-3 |
| [DIAL-MPC](https://github.com/LeCAR-Lab/dial-mpc) | LeCAR-Lab | GPU 采样 MPC 求解器源码(无需 RL 训练) + MuJoCo 示例 | MIT |
| [GR00T-VisualSim2Real](https://github.com/NVlabs/GR00T-VisualSim2Real) | NVIDIA | Teacher-Student DAgger 蒸馏 + PPO 教师 + ONNX + G1 真机 (CVPR 2026) | Apache-2.0 |
| [Genesis-Humanoid](https://github.com/UMass-Embodied-AGI/Genesis-Humanoid) | UMass | Genesis 一体化人形训练(PPO+BC+遥操作) + 8192 envs 并行 | Apache-2.0 |
| [ManiSkill3](https://github.com/haosulab/ManiSkill) | Hillbot | GPU 并行仿真 + PPO/SAC/TD-MPC2 Baseline + 人形任务 | Apache-2.0 |

---

## Phase 2: 硬件驱动

> 电机选型、通信标定、HIL 测试。每个平台标注了开源范围。

### 全开源平台（硬件+软件全开放）

| 平台 | 机构 | DoF | 成本 | 开源内容 | 许可 |
|------|------|-----|------|---------|------|
| [roboto_origin](https://github.com/Roboparty/roboto_origin) | 萝博派对 | 23 | ¥3.5万 | CAD/PCB/EBOM/SOP/Party OS 全开源，淘宝可购零件组装 | Apache-2.0 |
| [AgiBot X1 灵犀](https://github.com/AgibotTech/agibot_x1) | 智元 | 28 | 量产级 | 硬件设计(CAD/PCB)+RL训练(infer/train/hardware三仓库)+AimRT+灵渠OS | Apache-2.0 |
| [OpenLoong 青龙](https://openloong.openatom.cn) | 国地中心 | 40 | 量产级 | 机械图纸+电控方案+URDF+龙腾2.0B+格物仿真，OpenAtom基金会 | OpenAtom |
| [Fourier N1](https://github.com/FFTAI) | 傅利叶 | 32 | 量产级 | 结构蓝图+装配指南+Python SDK+RL训练示例 | Apache-2.0 |
| [Berkeley Lite](https://github.com/hybridrobotics/berkeley-humanoid-lite) | UC Berkeley | 12 | <$5000 | 3D打印STL+齿轮箱CAD+电路图+Isaac Lab步态+遥操作代码 | MIT |
| [LeRobot Humanoid](https://github.com/huggingface/lerobot) | HuggingFace | 14 | ~$2500 | 3D打印STL+BOM+LeRobot录制/训练/推理(ACT/Diffusion/Flow) | Apache-2.0 |
| [Asimov v0/v1](https://github.com/asimovinc/asimov-1) | Menlo | 18 | DIY | 机械CAD+电气CAD+Isaac Sim仿真模型+板载固件 | MIT |
| [Unitree Qmini](https://github.com/unitreerobotics/Qmini) | 宇树 | 12 | 教育级 | BOM+装配指南+RoboTamer4Qmini控制框架+URDF | BSD-3 |
| [TienKung 天工](https://github.com/Open-X-Humanoid) | 国地中心 | 35 | 量产级 | URDF+TienKung-Lab(IsaacLab+AMP)+LeRobot集成 | Apache-2.0 |
| [K-Bot](https://github.com/kscalelabs/kbot) | K-Scale | 15 | $8999 | 全套硬件CAD+软件源码+Python SDK+组装文档(已停运) | MIT |
| [Reachy 2](https://pollen-robotics.com/reachy-2) | Pollen(HF) | — | 商用 | 双臂CAD+ROS2 Humble驱动+VR遥操作+Python SDK | Apache-2.0 |
| [OpenArm](https://github.com/enactic/OpenArm) | Enactic | — | $6500 | 双臂CAD+固件+LeRobot集成+双向力反馈遥操作 | MIT |

### 半开源平台（SDK/软件开源，硬件闭源）

| 平台 | 机构 | 开源内容 | 许可 |
|------|------|---------|------|
| [Unitree H1/H1-2](https://www.unitree.com/h1) | 宇树 | unitree_sdk2 + unitree_rl_gym + ROS2 包 开源 | BSD-3(SDK) |
| [Unitree G1](https://www.unitree.com/g1) | 宇树 | 同上 + UnifoLM-VLA 模型权重开源 | BSD-3(SDK) |
| [Booster T1/K1](https://boosterobotics.com) | 加速进化 | Booster Gym/Train/Studio IDE 开源 | Proprietary SDK |
| [EngineAI SA01/PM01](https://github.com/engineai-robotics) | 松延动力 | 端到端神经网络控制代码 + URDF 开源 | Apache-2.0 |
| [Fourier GR-2](https://www.fftai.com) | 傅利叶 | 第二代商用，N1 资料开源，GR-2 闭源 | Proprietary |
| [RobotEra XBot](https://www.robotera.com) | 星动纪元 | Humanoid-Gym 训练框架开源(MIT)，本体闭源 | MIT(框架) |

### 商用闭源平台（仅产品信息，供参考）

| 平台 | 机构 | 亮点 | 官网 |
|------|------|------|------|
| Tesla Optimus Gen 2 | Tesla | FSD复用，40-DoF，$20K目标 | [官网](https://www.tesla.com/optimus) |
| Figure 02 | Figure AI | OpenAI合作，宝马试点 | [官网](https://www.figure.ai) |
| Atlas 电动版 | Boston Dynamics | 跑酷/后空翻 | [官网](https://bostondynamics.com/atlas) |
| 1X Neo | 1X Technologies | 家用柔顺力控 | [官网](https://www.1x.tech) |
| Digit | Agility Robotics | 亚马逊仓库部署 | [官网](https://agilityrobotics.com) |
| Apollo | Apptronik | NASA技术，奔驰试点 | [官网](https://apptronik.com) |
| UBTech Walker S | 优必选 | 蔚来/比亚迪工厂实训 | [官网](https://www.ubtrobot.com) |
| Xiaomi CyberOne | 小米 | 小爱同学+AIoT | [官网](https://www.mi.com) |
| PAL TALOS | PAL Robotics | 欧洲科研标准，ROS | [官网](https://pal-robotics.com) |
| 达闼 XR4 | 达闼 | 云端大脑 HARIX，41-DoF | [官网](https://www.cloudminds.com) |
| 乐聚 KUAVO | 乐聚+华为 | 昇腾+鸿蒙 | [官网](https://www.lejurobot.com) |
| Kepler 先行者 | 开普勒 | 工业搬运，85kg | [官网](https://www.keplerbot.com) |
| 星海图 G0/G0.5 | 星海图 | Fast-WAM 世界模型 | [GitHub](https://github.com/galaxea-explorer) |
| 逐际动力 CL-1 | 逐际动力 | RL 驱动双足 | [官网](https://www.limxdynamics.com) |
| 魔法原子 | Magic Atom | 服务机器人+自然语言 | [官网](https://www.magicatom.com) |
| 银河通用 G1 | Galbot | 轮式双臂，零售补货 | [官网](https://www.galbot.com) |
| 众擎 SE01 | 众擎 | 全地形行走 | [官网](https://www.engineai.com.cn) |
| 松延 N2 | 松延动力 | 轻量级双足 | [官网](https://www.noetix.com.cn) |
| Phoenix | Sanctuary AI | 液压+电动混合 | [官网](https://sanctuaryai.com) |
| MenteeBot | Mentee Robotics | Mobileye团队 | [官网](https://www.menteebot.com) |
| Rainbow RB-Y1 | Rainbow | 三星投资，半导体 | [官网](https://www.rainbow-robotics.com) |
| 腾讯 Robotics X | 腾讯 | 轮腿混合+大模型 | [官网](https://roboticsx.tencent.com) |
| XPeng IRON | 小鹏 | XNGP 自动驾驶复用 | [官网](https://www.xiaopeng.com) |
| Dreame 人形 | 追觅 | 扫地机 SLAM 复用 | [官网](https://www.dreame.com) |
| Kawasaki Kaleido | 川崎重工 | 精密减速器 | [官网](https://robotics.kawasaki.com) |
| Toyota T-HR3 | 丰田 | 力反馈遥操作 | [官网](https://global.toyota) |

---

## Phase 3: 算法智能

> WBC 全身控制 + VLA 具身大脑 + 训练数据集。

### 真机控制与通信 (13)

| 项目 | 机构 | 开源内容 | 许可 |
|------|------|---------|------|
| [unitree_sdk2](https://github.com/unitreerobotics/unitree_sdk2) | 宇树 | CycloneDDS 通信层 C++/Python 源码 + ROS2 + H1/G1/Go2 驱动 | BSD-3 |
| [GR00T-WBC](https://github.com/NVlabs/GR00T-WholeBodyControl) | NVIDIA | QP 全身力矩控制器 C++ 源码 + 解耦 WBC | Apache-2.0 |
| [OCS2 + Pinocchio](https://github.com/leggedrobotics/ocs2) | ETH | 非线性 MPC 完整 C++ 源码 + 高效刚体动力学库 | BSD-3 |
| [AimRT](https://github.com/AimRT/AimRT) | 智元 | 高性能中间件 C++ 源码 + ROS2/HTTP/gRPC 兼容 | Apache-2.0 |
| [Open-TeleVision](https://github.com/OpenTeleVision/TeleVision) | UCSD+MIT | AVP 遥操作 Python 代码 + 立体视觉 + 关节重定向 | MIT |
| [ALOHA / Mobile ALOHA](https://mobile-aloha.github.io) | Stanford | 双臂硬件 CAD + ACT 训练/推理 + 遥操作采集 + 数据集 | MIT |
| [Unitree XR Teleop](https://github.com/unitreerobotics/xr_teleoperate) | 宇树 | AVP/Quest 遥操作代码 + H1/G1 灵巧手适配 | BSD-3 |
| [OpenWBT](https://github.com/GalaxyGeneralRobots/OpenWBT) | 银河通用+清华 | AVP 全身遥操作(行走+下蹲+抓取) + G1/H1 | MIT |
| [MIT Cheetah](https://github.com/mit-biomimetics/Cheetah-Software) | MIT | 凸优化 MPC + WBC QP + 卡尔曼状态估计 C++ 源码 | MIT |
| [Solo12 / ODRI](https://github.com/open-dynamic-robot-initiative) | MPI/NYU | 关节模组硬件 CAD + 固件 + Pinocchio/TSID WBC + ROS2 | BSD-3 |
| [CHAMP](https://github.com/chvmp/champ) | 社区 | FSM+MPC+WBC 分层四足控制 ROS 包 + Gazebo/MuJoCo | BSD-3 |
| [Deep Robotics SDK](https://github.com/DeepRobotics) | 深度波动 | Python/C++ SDK + GPU PPO 训练示例，本体闭源 | Apache-2.0 |
| [Stanford Pupper](https://github.com/stanfordroboticsclub/StanfordQuadruped) | Stanford | 全套 CAD+固件+CPG+IMU 平衡控制，<$500 | MIT |

### VLA 具身大脑 (21)

| 模型 | 机构 | 开源内容 | 许可 |
|------|------|---------|------|
| [GR00T N1.7](https://github.com/Nvidia/Isaac-GR00T) | NVIDIA | 快慢双系统模型权重 + 推理 + TensorRT + EgoScale 数据集 | Apache-2.0 |
| [openpi π0](https://github.com/Physical-Intelligence/openpi) | Physical Intelligence | Flow Matching 模型权重 + 推理 + 微调工具链 | Apache-2.0 |
| [Psi-Zero Ψ0](https://github.com/physical-superintelligence-lab/Psi0) | USC | Loco-Manipulation 权重 + 训练/推理 + G1/H1 部署 (RSS 2026) | MIT |
| [LingBot-VLA 2.0](https://github.com/Robbyant/lingbot-vla) | 蚂蚁灵波 | 跨本体后训练框架 + LoRA 适配 + 17 厂商配置 | Apache-2.0 |
| [HEX VLA](https://github.com/Open-X-Humanoid/HEX) | Open-X-Humanoid | Qwen-VL+流匹配动作头代码 + 12M 帧预训练数据 | Apache-2.0 |
| [HoloMotion](https://github.com/HorizonRobotics/HoloMotion) | 地平线 | MoE Transformer 全身控制权重 + 推理代码 | Apache-2.0 |
| [UnifoLM-VLA](https://github.com/unitreerobotics/unifolm-vla) | 宇树 | VLA 权重 + 推理 + WMA-0 世界模型 + G1 映射 | BSD-3 |
| [Dexora](https://github.com/dexoravla/Dexora) | 清华 | 36-DoF 灵巧手 VLA + 分布式注意力代码 + 100K 数据 (ICRA 2026) | MIT |
| [RDT-1B/RDT2](https://github.com/thu-ml/RDT2) | 清华 | 1.2B 扩散/流匹配权重 + 46 数据集预处理 + 训练/微调 | Apache-2.0 |
| [GEAR-SONIC](https://huggingface.co/nvidia/GEAR-SONIC) | NVIDIA | 1.2M-42M 行为模型权重，700h 动捕预训练，HuggingFace 推理 | Apache-2.0 |
| [GO-1/GO-2](https://github.com/AgibotTech) | 智元 | ViLLA VLA 推理 + InternVL-2B 视觉主干 + 隐式动作标记 | Apache-2.0 |
| [NVIDIA Cosmos](https://github.com/nvidia/Cosmos) | NVIDIA | 世界模型权重(Transfer+Predict) + 推理 + Post-training | OpenMDW-1.1 |
| [Oasis](https://github.com/decart-ai/oasis) | Decart | 500M/1.2B 交互式世界模型权重 + PyTorch 推理，20FPS | MIT |
| [DexVLA](https://github.com/juruobenruo/DexVLA) | 多机构 | Qwen2-VL VLA 权重 + 单臂/双臂/灵巧手统一推理 | Apache-2.0 |
| [WholebodyVLA](https://github.com/OpenDriveLab/WholebodyVLA) | 上海AI Lab | 全身移动操作 VLA 权重 + 潜空间表征 (ICLR 2026) | Apache-2.0 |
| [X-VLA](https://github.com/2toinf/X-VLA) | 2toinf | Soft-Prompt 跨本体适配 + 权重，AgiBot 冠军 (ICLR 2026) | Apache-2.0 |
| [InternVLA-M1](https://github.com/InternRobotics/InternVLA-M1) | 上海AI Lab | Qwen2.5-VL 空间引导 VLA 权重 + 推理 | MIT |
| [DexGraspVLA](https://github.com/Psi-Robot/DexGraspVLA) | 灵初+北大 | VLM+扩散分层代码，>90% 抓取 (AAAI 2026 Oral) | Apache-2.0 |
| [GalaxeaVLA](https://github.com/OpenGalaxea/GalaxeaVLA) | 星海图 | 双系统 VLA + Fast-WAM + 500h 开放场景数据集 | Apache-2.0 |
| [MiMo-Embodied](https://github.com/XiaomiMiMo/MiMo-Embodied) | 小米 | 跨具身统一模型权重，29 榜单独占鳌头 | Apache-2.0 |
| [RynnVLA-001](https://github.com/alibaba-damo-academy/RynnVLA-001) | 阿里达摩院 | 视频生成预训练 VLA + 人类第一人称 demo (ICRA 2026) | Apache-2.0 |

### 训练数据集 (8)

| 数据集 | 机构 | 规模 | 开源内容 | 许可 |
|--------|------|------|---------|------|
| [AgiBot World](https://agibot-world.com) | 智元 | 百万级轨迹 | RGB+关节+力矩+音频，100% 真机 | CC BY-NC 4.0 |
| [RoboMIND V2.0](https://huggingface.co/datasets/x-humanoid-robomind/RoboMIND) | 国地中心 | 400K+ 轨迹 | 6 本体 739 任务 + 阵列触觉 | Apache-2.0 |
| [Humanoid Everyday](https://github.com/physical-superintelligence-lab/Humanoid-Everyday) | USC | 10.3K/300万帧 | 9 模态(RGB+Depth+LiDAR+Tactile+IMU+Audio) | MIT |
| [Open X-Embodiment](https://github.com/google-deepmind/open_x_embodiment) | DeepMind | 100万+ Episodes | 22 种机器人统一 RLDS 格式 | CC BY 4.0 |
| [EgoScale](https://arxiv.org) | NVIDIA | 2 万小时 | 人类第一人称动作视频，验证 Log-linear Scaling Law | Apache-2.0 |
| [Unitree G1 Dataset](https://huggingface.co/UnitreeRobotics) | 宇树 | 数万条 | 拧瓶盖/倒水/叠衣服，29-DoF+视觉 | BSD-3 |
| [DROID](https://droid-dataset.github.io) | Stanford/Berkeley/CMU | 76K+ 轨迹 | 18 实验室 86 场景，RGB/Depth/力矩 | MIT |
| [LeRobot Hub](https://huggingface.co/lerobot) | HuggingFace | 数千条 | 双臂/双手/人形，ACT/Diffusion/VQ-BeT 格式 | Apache-2.0 |

---

## Phase 4: 测试部署 + 参考

### 核心论文 (33篇)

| 类别 | 论文 | 会议 | 链接 |
|------|------|------|------|
| Sim2Real | legged_gym | Science Robotics 2022 | [GitHub](https://github.com/leggedrobotics/legged_gym) |
| Sim2Real | Humanoid-Gym | CoRL 2024 | [GitHub](https://github.com/roboterax/humanoid-gym) |
| Sim2Real | ASAP | RSS 2025 | [GitHub](https://github.com/LeCAR-Lab/ASAP) |
| Sim2Real | DrEureka | RSS 2024 | [GitHub](https://github.com/eureka-research/DrEureka) |
| Sim2Real | Isaac Gym | NeurIPS 2021 | [NVIDIA](https://developer.nvidia.com/isaac-gym) |
| Sim2Real | Genesis | arXiv 2024 | [GitHub](https://github.com/Genesis-Embodied-AI/genesis-world) |
| Sim2Real | LucidSim | CoRL 2024 | [GitHub](https://github.com/lucidsim/lucidsim) |
| VLA | RT-2 | CoRL 2023 | [arXiv](https://arxiv.org/abs/2307.15818) |
| VLA | RT-1 | RSS 2023 | [arXiv](https://arxiv.org/abs/2212.06817) |
| VLA | Octo | RSS 2024 | [GitHub](https://github.com/octo-models/octo) |
| VLA | Diffusion Policy | RSS 2023 | [GitHub](https://github.com/columbia-ai-robotics/diffusion_policy) |
| VLA | GR00T N1 | arXiv 2025 | [GitHub](https://github.com/Nvidia/Isaac-GR00T) |
| VLA | π0 | arXiv 2024 | [GitHub](https://github.com/Physical-Intelligence/openpi) |
| VLA | EgoScale | CVPR 2025 | [arXiv](https://arxiv.org) |
| VLA | Gato | arXiv 2022 | [arXiv](https://arxiv.org/abs/2205.06175) |
| 控制 | HumanPlus | CoRL 2024 | [GitHub](https://github.com/ZipengFu/humanplus) |
| 控制 | OmniH2O | CoRL 2024 | [GitHub](https://github.com/CMU-GKG/OmniH2O) |
| 控制 | Mobile ALOHA | arXiv 2024 | [GitHub](https://github.com/MarkFzp/mobile-aloha) |
| 控制 | ACT | CoRL 2023 | [GitHub](https://github.com/tonyzhaozh/act) |
| 控制 | UMI | RSS 2024 | [GitHub](https://github.com/real-stanford/universal_manipulation_interface) |
| 控制 | H2O | CoRL 2023 | [GitHub](https://github.com/ZhengyiLuo/H2O) |
| 控制 | 3D Diffuser Actor | CoRL 2024 | [GitHub](https://github.com/nickgkan/3d_diffuser_actor) |
| 控制 | Expressive Locomotion | RSS 2024 | [GitHub](https://github.com/hybridrobotics/berkeley-humanoid) |
| 综述 | Awesome Humanoid (550+ Papers) | GitHub | [GitHub](https://github.com/YanjieZe/awesome-humanoid-robot-learning) |
| 综述 | Sim2Real Survey | IEEE T-RO 2023 | [IEEE](https://ieeexplore.ieee.org) |
| 综述 | VLA Survey | arXiv 2025 | [arXiv](https://arxiv.org) |
| 综述 | Humanoid Survey | AR 2025 | [arXiv](https://arxiv.org) |
| 综述 | Imitation Learning Survey | AR 2024 | [arXiv](https://arxiv.org) |
| 综述 | Deep RL for Robotics | IEEE T-RO 2021 | [arXiv](https://arxiv.org) |
| 文献 | PPO | arXiv 2017 | [arXiv](https://arxiv.org/abs/1707.06347) |
| 文献 | AlphaPose | ICCV 2021 | [GitHub](https://github.com/MVIG-SJTU/AlphaPose) |
| 文献 | 3D Diffusion Policy | CoRL 2024 | [GitHub](https://github.com/nickgkan/3d_diffuser_actor) |
| 文献 | RFT (LLM微调) | arXiv 2024 | [arXiv](https://arxiv.org) |

### 技术百科 (18 术语)

| 类别 | 术语 | 核心概念 |
|------|------|---------|
| 机械结构 | 关节重定向 | IK/AMP/学习三种方法，质量评估四指标 |
| 嵌入式硬件 | 驱动关节电机 | BLDC(100-360Nm)/舵机(1-10Nm)/QDD(5-40Nm)，厂商+选型 |
| 嵌入式硬件 | 主控与计算 | Jetson Orin/STM32/树莓派双层架构，实时性要求 |
| 嵌入式硬件 | IMU 惯性测量 | ICM-20948/BMI088/MPU6050 对比，AHRS 姿态估计 |
| 嵌入式硬件 | 通信总线 | EtherCAT/CAN-FD/CAN2.0/TTL 四层对比 |
| 嵌入式软件 | 实时控制中间件 | FOC→PID→WBC解算→MPC 调用链 |
| 仿真 | 仿真器全景对比 | MuJoCo/Isaac/Genesis/Gazebo/Newton 5款横向对比 |
| 仿真 | Sim2Real 迁移 | 域随机化/Sim2Sim校验/残差策略/域迁移/系统辨识 |
| 仿真 | 域随机化 | 8 种参数范围 + 难度递进策略 |
| RL算法 | Actor-Critic | A2C/A3C/SAC/TD3/PPO 五变体对比 |
| RL算法 | PPO | Clip 机制 + GAE + 标准配置(γ=0.99, λ=0.95) |
| RL算法 | 扩散策略/流匹配 | DDPM vs Flow Matching，推理步数 100-1000 vs 10-50 |
| 神经网络 | MLP/Transformer/MoE | 三种架构在人形RL/VLA中的应用场景 |
| 激活函数 | ELU/ReLU/GELU/SiLU | RL选ELU，VLA选GELU/SiLU，原因分析 |
| 基础设施 | GPU并行化训练 | Isaac Lab vs MuJoCo MJX，4096 vs 32768 envs |
| 基础设施 | WBC全身控制 | 优化型/学习型/混合型，任务优先级四层 |
| VLA模型 | VLA 三种范式 | 端到端/分层(Dual-System)/解耦 |
| VLA模型 | 遥操作数据采集 | AVP/Quest/动捕/主从/Leader-Follower 六方案对比 |

---

## 发展里程碑

2024.03 Humanoid-Gym → 2024.06 HumanPlus → 2024.07 青龙公版机 → 2024.12 Genesis/AgiBot World → 2025.03 GR00T N1/格物 → 2025.04 灵犀 X1 → 2025.05 openpi/Berkeley Lite → 2025.06 MuJoCo Playground/ASAP → 2025.10 openpi微调/Eureka → 2025.11 HoloMotion → 2025.12 Dexora/Fourier N1 → 2026.01 roboto_origin/LingBot-VLA → 2026.03 灵渠OS/Asimov → 2026.04 Psi-Zero/灵龙2.0 → 2026.05 LeRobot/GR00T N1.7 → 2026.06 HEX/Dexora(ICRA) → 2026.07 LingBot-World 2.0/Party OS

---

## 本地运行

```bash
git clone https://github.com/bbhliheyi/humanoid-eco-nav.git
cd humanoid-eco-nav && npm install && npm run dev
```
