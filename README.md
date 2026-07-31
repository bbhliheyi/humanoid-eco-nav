# 🤖 人形机器人开源生态导航

> 每个项目标注了**开源内容到底是什么**——代码？模型权重？硬件图纸？数据集？

**🌐 在线访问**：[bbhliheyi.github.io/humanoid-eco-nav](https://bbhliheyi.github.io/humanoid-eco-nav)
**📦 源码仓库**：[github.com/bbhliheyi/humanoid-eco-nav](https://github.com/bbhliheyi/humanoid-eco-nav)

---

## Phase 1: 数字孪生

> 仿真器 + URDF + RL 训练耦合推进。先在数字世界让机器人走起来。

### 仿真引擎 (14)

<table>
<thead>
<tr>
<th width="45%">项目</th>
<th width="10%">机构</th>
<th width="45%">开源内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>[Isaac Sim](https://developer.nvidia.com/isaac/sim)</td>
<td>NVIDIA</td>
<td>SDK / Python API / Extensions 开源，PhysX 5 核心引擎免费但闭源</td>
</tr>
<tr>
<td>[MuJoCo / MJX](https://github.com/google-deepmind/mujoco)</td>
<td>DeepMind</td>
<td>完整 C 源码 + Python + JAX GPU + 可微分物理 + MJPC，Apache-2.0</td>
</tr>
<tr>
<td>[Genesis World](https://github.com/Genesis-Embodied-AI/genesis-world)</td>
<td>社区</td>
<td>统一物理引擎全源码(刚体/柔体/流体/气体)，GPU加速，全可微，Apache-2.0</td>
</tr>
<tr>
<td>[Gazebo](https://gazebosim.org)</td>
<td>Open Robotics</td>
<td>完整 C++ 源码 + ROS2 插件生态，多物理后端(ODE/Bullet/DART)，Apache-2.0</td>
</tr>
<tr>
<td>[Newton](https://developer.nvidia.com/physx-sdk)</td>
<td>NVIDIA</td>
<td>PhysX 5 SDK 免费使用，核心闭源，NVIDIA EULA</td>
</tr>
<tr>
<td>[Genie Sim 3.0](https://github.com/AgibotTech/genie_sim)</td>
<td>智元</td>
<td>LLM 驱动场景生成 Python 代码 + 示例，Apache-2.0</td>
</tr>
<tr>
<td>[LingBot-World 2.0](https://opensource.antgroup.com)</td>
<td>蚂蚁灵波</td>
<td>14B MoE 世界模型权重 + 推理代码，720P/60fps</td>
</tr>
<tr>
<td>[格物 Gewu](https://openloong.openatom.cn)</td>
<td>国地中心</td>
<td>Unity RL Playground + 青龙/灵龙 URDF + ML-Agents 配置，OpenAtom</td>
</tr>
<tr>
<td>[RoboCasa / HumanoidBench](https://github.com/robocasa/robocasa)</td>
<td>UT Austin</td>
<td>100+ 场景 MuJoCo 模型 + 27 项评估协议 + Baseline，MIT</td>
</tr>
<tr>
<td>[WorldGen](https://github.com/svl-stanford/worldgen)</td>
<td>Stanford</td>
<td>DiT 3D 场景生成模型权重 + 推理 + 物理碰撞生成，Apache-2.0</td>
</tr>
<tr>
<td>[RaiSim](https://raisim.com)</td>
<td>ETH</td>
<td>Python/C++ API 学术免费，核心商用授权，比 MuJoCo 快 3-5 倍</td>
</tr>
<tr>
<td>[Unitree MuJoCo Sim](https://github.com/unitreerobotics/unitree_mujoco)</td>
<td>宇树</td>
<td>H1/G1/Go2 MJCF 模型 + MuJoCo 场景 + SDK2 集成 + 地形生成，BSD-3</td>
</tr>
<tr>
<td>[Unitree Isaac Lab Sim](https://github.com/unitreerobotics/unitree_sim_isaaclab)</td>
<td>宇树</td>
<td>H1/G1 Isaac Lab 环境 + 数据采集回放 + 模型验证，BSD-3</td>
</tr>
<tr>
<td>[EmbodiedGen](https://github.com/HorizonRobotics/EmbodiedGen)</td>
<td>地平线</td>
<td>文字/照片→3D 场景生成代码 + 多仿真后端导出，Apache-2.0</td>
</tr>
</tbody>
</table>


### 训练框架 (14)

<table>
<thead>
<tr>
<th width="30%">项目</th>
<th width="10%">机构</th>
<th width="30%">开源内容</th>
<th width="30%">许可</th>
</tr>
</thead>
<tbody>
<tr>
<td>[Isaac Lab](https://github.com/isaac-sim/IsaacLab)</td>
<td>NVIDIA</td>
<td>完整 Python 训练框架(Obs/Reward/DomainRand Manager + PPO/SAC) + ONNX/TensorRT 导出 + ROS2 部署</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[legged_gym](https://github.com/leggedrobotics/legged_gym)</td>
<td>ETH</td>
<td>极简单文件 PPO+GAE+域随机化训练脚本 + 四足/人形 URDF</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[MuJoCo Playground](https://github.com/google-deepmind/mujoco_playground)</td>
<td>DeepMind</td>
<td>纯 JAX GPU PPO 代码(端到端) + 人形步态示例，单卡数分钟训练</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[unitree_rl_gym](https://github.com/unitreerobotics/unitree_rl_gym)</td>
<td>宇树</td>
<td>G1/H1 完整 Train→Play→Sim2Sim→Sim2Real 代码 + ONNX导出 + ROS2部署</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[Humanoid-Gym](https://github.com/roboterax/humanoid-gym)</td>
<td>星动纪元</td>
<td>Sim2Sim 校验框架(Isaac→MuJoCo 自动对比) + XBot URDF + 零样本部署</td>
<td>MIT</td>
</tr>
<tr>
<td>[HumanoidVerse](https://github.com/LeCAR-Lab/HumanoidVerse)</td>
<td>上交</td>
<td>多仿真器统一接口(Isaac/Genesis 一键切换) + Sim2Sim 校验</td>
<td>MIT</td>
</tr>
<tr>
<td>[skrl](https://github.com/Toni-SM/skrl)</td>
<td>社区</td>
<td>PPO/SAC/TD3 多算法 + PyTorch/JAX/Warp 三后端 + Isaac/MuJoCo 示例</td>
<td>MIT</td>
</tr>
<tr>
<td>[ASAP](https://github.com/LeCAR-Lab/ASAP)</td>
<td>LeCAR-Lab</td>
<td>Delta Action Model 在线残差学习 + 真机微调流程 (RSS 2025)</td>
<td>MIT</td>
</tr>
<tr>
<td>[Eureka / DrEureka](https://github.com/eureka-research/eureka)</td>
<td>NVIDIA</td>
<td>LLM 自动生成奖励函数 + 进化搜索 + 域随机化参数自动设计</td>
<td>MIT</td>
</tr>
<tr>
<td>[AMP / DeepMimic](https://xbpeng.github.io/projects/AMP)</td>
<td>SFU/Berkeley</td>
<td>对抗运动先验训练代码 + 动捕预处理 + 拟人步态判别器</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[DIAL-MPC](https://github.com/LeCAR-Lab/dial-mpc)</td>
<td>LeCAR-Lab</td>
<td>GPU 采样 MPC 求解器源码(无需 RL 训练) + MuJoCo 示例</td>
<td>MIT</td>
</tr>
<tr>
<td>[GR00T-VisualSim2Real](https://github.com/NVlabs/GR00T-VisualSim2Real)</td>
<td>NVIDIA</td>
<td>Teacher-Student DAgger 蒸馏 + PPO 教师 + ONNX + G1 真机 (CVPR 2026)</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Genesis-Humanoid](https://github.com/UMass-Embodied-AGI/Genesis-Humanoid)</td>
<td>UMass</td>
<td>Genesis 一体化人形训练(PPO+BC+遥操作) + 8192 envs 并行</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[ManiSkill3](https://github.com/haosulab/ManiSkill)</td>
<td>Hillbot</td>
<td>GPU 并行仿真 + PPO/SAC/TD-MPC2 Baseline + 人形任务</td>
<td>Apache-2.0</td>
</tr>
</tbody>
</table>


---

## Phase 2: 硬件驱动

> 电机选型、通信标定、HIL 测试。每个平台标注了开源范围。

### 全开源平台（硬件+软件全开放）

<table>
<thead>
<tr>
<th width="18%">平台</th>
<th width="10%">机构</th>
<th width="18%">DoF</th>
<th width="18%">成本</th>
<th width="18%">开源内容</th>
<th width="18%">许可</th>
</tr>
</thead>
<tbody>
<tr>
<td>[roboto_origin](https://github.com/Roboparty/roboto_origin)</td>
<td>萝博派对</td>
<td>23</td>
<td>¥3.5万</td>
<td>CAD/PCB/EBOM/SOP/Party OS 全开源，淘宝可购零件组装</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[AgiBot X1 灵犀](https://github.com/AgibotTech/agibot_x1)</td>
<td>智元</td>
<td>28</td>
<td>量产级</td>
<td>硬件设计(CAD/PCB)+RL训练(infer/train/hardware三仓库)+AimRT+灵渠OS</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[OpenLoong 青龙](https://openloong.openatom.cn)</td>
<td>国地中心</td>
<td>40</td>
<td>量产级</td>
<td>机械图纸+电控方案+URDF+龙腾2.0B+格物仿真，OpenAtom基金会</td>
<td>OpenAtom</td>
</tr>
<tr>
<td>[Fourier N1](https://github.com/FFTAI)</td>
<td>傅利叶</td>
<td>32</td>
<td>量产级</td>
<td>结构蓝图+装配指南+Python SDK+RL训练示例</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Berkeley Lite](https://github.com/hybridrobotics/berkeley-humanoid-lite)</td>
<td>UC Berkeley</td>
<td>12</td>
<td><$5000</td>
<td>3D打印STL+齿轮箱CAD+电路图+Isaac Lab步态+遥操作代码</td>
<td>MIT</td>
</tr>
<tr>
<td>[LeRobot Humanoid](https://github.com/huggingface/lerobot)</td>
<td>HuggingFace</td>
<td>14</td>
<td>~$2500</td>
<td>3D打印STL+BOM+LeRobot录制/训练/推理(ACT/Diffusion/Flow)</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Asimov v0/v1](https://github.com/asimovinc/asimov-1)</td>
<td>Menlo</td>
<td>18</td>
<td>DIY</td>
<td>机械CAD+电气CAD+Isaac Sim仿真模型+板载固件</td>
<td>MIT</td>
</tr>
<tr>
<td>[Unitree Qmini](https://github.com/unitreerobotics/Qmini)</td>
<td>宇树</td>
<td>12</td>
<td>教育级</td>
<td>BOM+装配指南+RoboTamer4Qmini控制框架+URDF</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[TienKung 天工](https://github.com/Open-X-Humanoid)</td>
<td>国地中心</td>
<td>35</td>
<td>量产级</td>
<td>URDF+TienKung-Lab(IsaacLab+AMP)+LeRobot集成</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[K-Bot](https://github.com/kscalelabs/kbot)</td>
<td>K-Scale</td>
<td>15</td>
<td>$8999</td>
<td>全套硬件CAD+软件源码+Python SDK+组装文档(已停运)</td>
<td>MIT</td>
</tr>
<tr>
<td>[Reachy 2](https://pollen-robotics.com/reachy-2)</td>
<td>Pollen(HF)</td>
<td>—</td>
<td>商用</td>
<td>双臂CAD+ROS2 Humble驱动+VR遥操作+Python SDK</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[OpenArm](https://github.com/enactic/OpenArm)</td>
<td>Enactic</td>
<td>—</td>
<td>$6500</td>
<td>双臂CAD+固件+LeRobot集成+双向力反馈遥操作</td>
<td>MIT</td>
</tr>
</tbody>
</table>


### 半开源平台（SDK/软件开源，硬件闭源）

<table>
<thead>
<tr>
<th width="30%">平台</th>
<th width="10%">机构</th>
<th width="30%">开源内容</th>
<th width="30%">许可</th>
</tr>
</thead>
<tbody>
<tr>
<td>[Unitree H1/H1-2](https://www.unitree.com/h1)</td>
<td>宇树</td>
<td>unitree_sdk2 + unitree_rl_gym + ROS2 包 开源</td>
<td>BSD-3(SDK)</td>
</tr>
<tr>
<td>[Unitree G1](https://www.unitree.com/g1)</td>
<td>宇树</td>
<td>同上 + UnifoLM-VLA 模型权重开源</td>
<td>BSD-3(SDK)</td>
</tr>
<tr>
<td>[Booster T1/K1](https://boosterobotics.com)</td>
<td>加速进化</td>
<td>Booster Gym/Train/Studio IDE 开源</td>
<td>Proprietary SDK</td>
</tr>
<tr>
<td>[EngineAI SA01/PM01](https://github.com/engineai-robotics)</td>
<td>松延动力</td>
<td>端到端神经网络控制代码 + URDF 开源</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Fourier GR-2](https://www.fftai.com)</td>
<td>傅利叶</td>
<td>第二代商用，N1 资料开源，GR-2 闭源</td>
<td>Proprietary</td>
</tr>
<tr>
<td>[RobotEra XBot](https://www.robotera.com)</td>
<td>星动纪元</td>
<td>Humanoid-Gym 训练框架开源(MIT)，本体闭源</td>
<td>MIT(框架)</td>
</tr>
</tbody>
</table>


### 商用闭源平台（仅产品信息，供参考）

<table>
<thead>
<tr>
<th width="30%">平台</th>
<th width="10%">机构</th>
<th width="30%">亮点</th>
<th width="30%">官网</th>
</tr>
</thead>
<tbody>
<tr>
<td>Tesla Optimus Gen 2</td>
<td>Tesla</td>
<td>FSD复用，40-DoF，$20K目标</td>
<td>[官网](https://www.tesla.com/optimus)</td>
</tr>
<tr>
<td>Figure 02</td>
<td>Figure AI</td>
<td>OpenAI合作，宝马试点</td>
<td>[官网](https://www.figure.ai)</td>
</tr>
<tr>
<td>Atlas 电动版</td>
<td>Boston Dynamics</td>
<td>跑酷/后空翻</td>
<td>[官网](https://bostondynamics.com/atlas)</td>
</tr>
<tr>
<td>1X Neo</td>
<td>1X Technologies</td>
<td>家用柔顺力控</td>
<td>[官网](https://www.1x.tech)</td>
</tr>
<tr>
<td>Digit</td>
<td>Agility Robotics</td>
<td>亚马逊仓库部署</td>
<td>[官网](https://agilityrobotics.com)</td>
</tr>
<tr>
<td>Apollo</td>
<td>Apptronik</td>
<td>NASA技术，奔驰试点</td>
<td>[官网](https://apptronik.com)</td>
</tr>
<tr>
<td>UBTech Walker S</td>
<td>优必选</td>
<td>蔚来/比亚迪工厂实训</td>
<td>[官网](https://www.ubtrobot.com)</td>
</tr>
<tr>
<td>Xiaomi CyberOne</td>
<td>小米</td>
<td>小爱同学+AIoT</td>
<td>[官网](https://www.mi.com)</td>
</tr>
<tr>
<td>PAL TALOS</td>
<td>PAL Robotics</td>
<td>欧洲科研标准，ROS</td>
<td>[官网](https://pal-robotics.com)</td>
</tr>
<tr>
<td>达闼 XR4</td>
<td>达闼</td>
<td>云端大脑 HARIX，41-DoF</td>
<td>[官网](https://www.cloudminds.com)</td>
</tr>
<tr>
<td>乐聚 KUAVO</td>
<td>乐聚+华为</td>
<td>昇腾+鸿蒙</td>
<td>[官网](https://www.lejurobot.com)</td>
</tr>
<tr>
<td>Kepler 先行者</td>
<td>开普勒</td>
<td>工业搬运，85kg</td>
<td>[官网](https://www.keplerbot.com)</td>
</tr>
<tr>
<td>星海图 G0/G0.5</td>
<td>星海图</td>
<td>Fast-WAM 世界模型</td>
<td>[GitHub](https://github.com/galaxea-explorer)</td>
</tr>
<tr>
<td>逐际动力 CL-1</td>
<td>逐际动力</td>
<td>RL 驱动双足</td>
<td>[官网](https://www.limxdynamics.com)</td>
</tr>
<tr>
<td>魔法原子</td>
<td>Magic Atom</td>
<td>服务机器人+自然语言</td>
<td>[官网](https://www.magicatom.com)</td>
</tr>
<tr>
<td>银河通用 G1</td>
<td>Galbot</td>
<td>轮式双臂，零售补货</td>
<td>[官网](https://www.galbot.com)</td>
</tr>
<tr>
<td>众擎 SE01</td>
<td>众擎</td>
<td>全地形行走</td>
<td>[官网](https://www.engineai.com.cn)</td>
</tr>
<tr>
<td>松延 N2</td>
<td>松延动力</td>
<td>轻量级双足</td>
<td>[官网](https://www.noetix.com.cn)</td>
</tr>
<tr>
<td>Phoenix</td>
<td>Sanctuary AI</td>
<td>液压+电动混合</td>
<td>[官网](https://sanctuaryai.com)</td>
</tr>
<tr>
<td>MenteeBot</td>
<td>Mentee Robotics</td>
<td>Mobileye团队</td>
<td>[官网](https://www.menteebot.com)</td>
</tr>
<tr>
<td>Rainbow RB-Y1</td>
<td>Rainbow</td>
<td>三星投资，半导体</td>
<td>[官网](https://www.rainbow-robotics.com)</td>
</tr>
<tr>
<td>腾讯 Robotics X</td>
<td>腾讯</td>
<td>轮腿混合+大模型</td>
<td>[官网](https://roboticsx.tencent.com)</td>
</tr>
<tr>
<td>XPeng IRON</td>
<td>小鹏</td>
<td>XNGP 自动驾驶复用</td>
<td>[官网](https://www.xiaopeng.com)</td>
</tr>
<tr>
<td>Dreame 人形</td>
<td>追觅</td>
<td>扫地机 SLAM 复用</td>
<td>[官网](https://www.dreame.com)</td>
</tr>
<tr>
<td>Kawasaki Kaleido</td>
<td>川崎重工</td>
<td>精密减速器</td>
<td>[官网](https://robotics.kawasaki.com)</td>
</tr>
<tr>
<td>Toyota T-HR3</td>
<td>丰田</td>
<td>力反馈遥操作</td>
<td>[官网](https://global.toyota)</td>
</tr>
</tbody>
</table>


---

## Phase 3: 算法智能

> WBC 全身控制 + VLA 具身大脑 + 训练数据集。

### 真机控制与通信 (13)

<table>
<thead>
<tr>
<th width="30%">项目</th>
<th width="10%">机构</th>
<th width="30%">开源内容</th>
<th width="30%">许可</th>
</tr>
</thead>
<tbody>
<tr>
<td>[unitree_sdk2](https://github.com/unitreerobotics/unitree_sdk2)</td>
<td>宇树</td>
<td>CycloneDDS 通信层 C++/Python 源码 + ROS2 + H1/G1/Go2 驱动</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[GR00T-WBC](https://github.com/NVlabs/GR00T-WholeBodyControl)</td>
<td>NVIDIA</td>
<td>QP 全身力矩控制器 C++ 源码 + 解耦 WBC</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[OCS2 + Pinocchio](https://github.com/leggedrobotics/ocs2)</td>
<td>ETH</td>
<td>非线性 MPC 完整 C++ 源码 + 高效刚体动力学库</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[AimRT](https://github.com/AimRT/AimRT)</td>
<td>智元</td>
<td>高性能中间件 C++ 源码 + ROS2/HTTP/gRPC 兼容</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Open-TeleVision](https://github.com/OpenTeleVision/TeleVision)</td>
<td>UCSD+MIT</td>
<td>AVP 遥操作 Python 代码 + 立体视觉 + 关节重定向</td>
<td>MIT</td>
</tr>
<tr>
<td>[ALOHA / Mobile ALOHA](https://mobile-aloha.github.io)</td>
<td>Stanford</td>
<td>双臂硬件 CAD + ACT 训练/推理 + 遥操作采集 + 数据集</td>
<td>MIT</td>
</tr>
<tr>
<td>[Unitree XR Teleop](https://github.com/unitreerobotics/xr_teleoperate)</td>
<td>宇树</td>
<td>AVP/Quest 遥操作代码 + H1/G1 灵巧手适配</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[OpenWBT](https://github.com/GalaxyGeneralRobots/OpenWBT)</td>
<td>银河通用+清华</td>
<td>AVP 全身遥操作(行走+下蹲+抓取) + G1/H1</td>
<td>MIT</td>
</tr>
<tr>
<td>[MIT Cheetah](https://github.com/mit-biomimetics/Cheetah-Software)</td>
<td>MIT</td>
<td>凸优化 MPC + WBC QP + 卡尔曼状态估计 C++ 源码</td>
<td>MIT</td>
</tr>
<tr>
<td>[Solo12 / ODRI](https://github.com/open-dynamic-robot-initiative)</td>
<td>MPI/NYU</td>
<td>关节模组硬件 CAD + 固件 + Pinocchio/TSID WBC + ROS2</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[CHAMP](https://github.com/chvmp/champ)</td>
<td>社区</td>
<td>FSM+MPC+WBC 分层四足控制 ROS 包 + Gazebo/MuJoCo</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[Deep Robotics SDK](https://github.com/DeepRobotics)</td>
<td>深度波动</td>
<td>Python/C++ SDK + GPU PPO 训练示例，本体闭源</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Stanford Pupper](https://github.com/stanfordroboticsclub/StanfordQuadruped)</td>
<td>Stanford</td>
<td>全套 CAD+固件+CPG+IMU 平衡控制，<$500</td>
<td>MIT</td>
</tr>
</tbody>
</table>


### VLA 具身大脑 (21)

<table>
<thead>
<tr>
<th width="30%">模型</th>
<th width="10%">机构</th>
<th width="30%">开源内容</th>
<th width="30%">许可</th>
</tr>
</thead>
<tbody>
<tr>
<td>[GR00T N1.7](https://github.com/Nvidia/Isaac-GR00T)</td>
<td>NVIDIA</td>
<td>快慢双系统模型权重 + 推理 + TensorRT + EgoScale 数据集</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[openpi π0](https://github.com/Physical-Intelligence/openpi)</td>
<td>Physical Intelligence</td>
<td>Flow Matching 模型权重 + 推理 + 微调工具链</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Psi-Zero Ψ0](https://github.com/physical-superintelligence-lab/Psi0)</td>
<td>USC</td>
<td>Loco-Manipulation 权重 + 训练/推理 + G1/H1 部署 (RSS 2026)</td>
<td>MIT</td>
</tr>
<tr>
<td>[LingBot-VLA 2.0](https://github.com/Robbyant/lingbot-vla)</td>
<td>蚂蚁灵波</td>
<td>跨本体后训练框架 + LoRA 适配 + 17 厂商配置</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[HEX VLA](https://github.com/Open-X-Humanoid/HEX)</td>
<td>Open-X-Humanoid</td>
<td>Qwen-VL+流匹配动作头代码 + 12M 帧预训练数据</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[HoloMotion](https://github.com/HorizonRobotics/HoloMotion)</td>
<td>地平线</td>
<td>MoE Transformer 全身控制权重 + 推理代码</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[UnifoLM-VLA](https://github.com/unitreerobotics/unifolm-vla)</td>
<td>宇树</td>
<td>VLA 权重 + 推理 + WMA-0 世界模型 + G1 映射</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[Dexora](https://github.com/dexoravla/Dexora)</td>
<td>清华</td>
<td>36-DoF 灵巧手 VLA + 分布式注意力代码 + 100K 数据 (ICRA 2026)</td>
<td>MIT</td>
</tr>
<tr>
<td>[RDT-1B/RDT2](https://github.com/thu-ml/RDT2)</td>
<td>清华</td>
<td>1.2B 扩散/流匹配权重 + 46 数据集预处理 + 训练/微调</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[GEAR-SONIC](https://huggingface.co/nvidia/GEAR-SONIC)</td>
<td>NVIDIA</td>
<td>1.2M-42M 行为模型权重，700h 动捕预训练，HuggingFace 推理</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[GO-1/GO-2](https://github.com/AgibotTech)</td>
<td>智元</td>
<td>ViLLA VLA 推理 + InternVL-2B 视觉主干 + 隐式动作标记</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[NVIDIA Cosmos](https://github.com/nvidia/Cosmos)</td>
<td>NVIDIA</td>
<td>世界模型权重(Transfer+Predict) + 推理 + Post-training</td>
<td>OpenMDW-1.1</td>
</tr>
<tr>
<td>[Oasis](https://github.com/decart-ai/oasis)</td>
<td>Decart</td>
<td>500M/1.2B 交互式世界模型权重 + PyTorch 推理，20FPS</td>
<td>MIT</td>
</tr>
<tr>
<td>[DexVLA](https://github.com/juruobenruo/DexVLA)</td>
<td>多机构</td>
<td>Qwen2-VL VLA 权重 + 单臂/双臂/灵巧手统一推理</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[WholebodyVLA](https://github.com/OpenDriveLab/WholebodyVLA)</td>
<td>上海AI Lab</td>
<td>全身移动操作 VLA 权重 + 潜空间表征 (ICLR 2026)</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[X-VLA](https://github.com/2toinf/X-VLA)</td>
<td>2toinf</td>
<td>Soft-Prompt 跨本体适配 + 权重，AgiBot 冠军 (ICLR 2026)</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[InternVLA-M1](https://github.com/InternRobotics/InternVLA-M1)</td>
<td>上海AI Lab</td>
<td>Qwen2.5-VL 空间引导 VLA 权重 + 推理</td>
<td>MIT</td>
</tr>
<tr>
<td>[DexGraspVLA](https://github.com/Psi-Robot/DexGraspVLA)</td>
<td>灵初+北大</td>
<td>VLM+扩散分层代码，>90% 抓取 (AAAI 2026 Oral)</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[GalaxeaVLA](https://github.com/OpenGalaxea/GalaxeaVLA)</td>
<td>星海图</td>
<td>双系统 VLA + Fast-WAM + 500h 开放场景数据集</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[MiMo-Embodied](https://github.com/XiaomiMiMo/MiMo-Embodied)</td>
<td>小米</td>
<td>跨具身统一模型权重，29 榜单独占鳌头</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[RynnVLA-001](https://github.com/alibaba-damo-academy/RynnVLA-001)</td>
<td>阿里达摩院</td>
<td>视频生成预训练 VLA + 人类第一人称 demo (ICRA 2026)</td>
<td>Apache-2.0</td>
</tr>
</tbody>
</table>


### 训练数据集 (8)

<table>
<thead>
<tr>
<th width="22%">数据集</th>
<th width="10%">机构</th>
<th width="22%">规模</th>
<th width="22%">开源内容</th>
<th width="22%">许可</th>
</tr>
</thead>
<tbody>
<tr>
<td>[AgiBot World](https://agibot-world.com)</td>
<td>智元</td>
<td>百万级轨迹</td>
<td>RGB+关节+力矩+音频，100% 真机</td>
<td>CC BY-NC 4.0</td>
</tr>
<tr>
<td>[RoboMIND V2.0](https://huggingface.co/datasets/x-humanoid-robomind/RoboMIND)</td>
<td>国地中心</td>
<td>400K+ 轨迹</td>
<td>6 本体 739 任务 + 阵列触觉</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Humanoid Everyday](https://github.com/physical-superintelligence-lab/Humanoid-Everyday)</td>
<td>USC</td>
<td>10.3K/300万帧</td>
<td>9 模态(RGB+Depth+LiDAR+Tactile+IMU+Audio)</td>
<td>MIT</td>
</tr>
<tr>
<td>[Open X-Embodiment](https://github.com/google-deepmind/open_x_embodiment)</td>
<td>DeepMind</td>
<td>100万+ Episodes</td>
<td>22 种机器人统一 RLDS 格式</td>
<td>CC BY 4.0</td>
</tr>
<tr>
<td>[EgoScale](https://arxiv.org)</td>
<td>NVIDIA</td>
<td>2 万小时</td>
<td>人类第一人称动作视频，验证 Log-linear Scaling Law</td>
<td>Apache-2.0</td>
</tr>
<tr>
<td>[Unitree G1 Dataset](https://huggingface.co/UnitreeRobotics)</td>
<td>宇树</td>
<td>数万条</td>
<td>拧瓶盖/倒水/叠衣服，29-DoF+视觉</td>
<td>BSD-3</td>
</tr>
<tr>
<td>[DROID](https://droid-dataset.github.io)</td>
<td>Stanford/Berkeley/CMU</td>
<td>76K+ 轨迹</td>
<td>18 实验室 86 场景，RGB/Depth/力矩</td>
<td>MIT</td>
</tr>
<tr>
<td>[LeRobot Hub](https://huggingface.co/lerobot)</td>
<td>HuggingFace</td>
<td>数千条</td>
<td>双臂/双手/人形，ACT/Diffusion/VQ-BeT 格式</td>
<td>Apache-2.0</td>
</tr>
</tbody>
</table>


---

## Phase 4: 测试部署 + 参考

### 核心论文 (33篇)

<table>
<thead>
<tr>
<th width="25%">类别</th>
<th width="25%">论文</th>
<th width="25%">会议</th>
<th width="25%">链接</th>
</tr>
</thead>
<tbody>
<tr>
<td>Sim2Real</td>
<td>legged_gym</td>
<td>Science Robotics 2022</td>
<td>[GitHub](https://github.com/leggedrobotics/legged_gym)</td>
</tr>
<tr>
<td>Sim2Real</td>
<td>Humanoid-Gym</td>
<td>CoRL 2024</td>
<td>[GitHub](https://github.com/roboterax/humanoid-gym)</td>
</tr>
<tr>
<td>Sim2Real</td>
<td>ASAP</td>
<td>RSS 2025</td>
<td>[GitHub](https://github.com/LeCAR-Lab/ASAP)</td>
</tr>
<tr>
<td>Sim2Real</td>
<td>DrEureka</td>
<td>RSS 2024</td>
<td>[GitHub](https://github.com/eureka-research/DrEureka)</td>
</tr>
<tr>
<td>Sim2Real</td>
<td>Isaac Gym</td>
<td>NeurIPS 2021</td>
<td>[NVIDIA](https://developer.nvidia.com/isaac-gym)</td>
</tr>
<tr>
<td>Sim2Real</td>
<td>Genesis</td>
<td>arXiv 2024</td>
<td>[GitHub](https://github.com/Genesis-Embodied-AI/genesis-world)</td>
</tr>
<tr>
<td>Sim2Real</td>
<td>LucidSim</td>
<td>CoRL 2024</td>
<td>[GitHub](https://github.com/lucidsim/lucidsim)</td>
</tr>
<tr>
<td>VLA</td>
<td>RT-2</td>
<td>CoRL 2023</td>
<td>[arXiv](https://arxiv.org/abs/2307.15818)</td>
</tr>
<tr>
<td>VLA</td>
<td>RT-1</td>
<td>RSS 2023</td>
<td>[arXiv](https://arxiv.org/abs/2212.06817)</td>
</tr>
<tr>
<td>VLA</td>
<td>Octo</td>
<td>RSS 2024</td>
<td>[GitHub](https://github.com/octo-models/octo)</td>
</tr>
<tr>
<td>VLA</td>
<td>Diffusion Policy</td>
<td>RSS 2023</td>
<td>[GitHub](https://github.com/columbia-ai-robotics/diffusion_policy)</td>
</tr>
<tr>
<td>VLA</td>
<td>GR00T N1</td>
<td>arXiv 2025</td>
<td>[GitHub](https://github.com/Nvidia/Isaac-GR00T)</td>
</tr>
<tr>
<td>VLA</td>
<td>π0</td>
<td>arXiv 2024</td>
<td>[GitHub](https://github.com/Physical-Intelligence/openpi)</td>
</tr>
<tr>
<td>VLA</td>
<td>EgoScale</td>
<td>CVPR 2025</td>
<td>[arXiv](https://arxiv.org)</td>
</tr>
<tr>
<td>VLA</td>
<td>Gato</td>
<td>arXiv 2022</td>
<td>[arXiv](https://arxiv.org/abs/2205.06175)</td>
</tr>
<tr>
<td>控制</td>
<td>HumanPlus</td>
<td>CoRL 2024</td>
<td>[GitHub](https://github.com/ZipengFu/humanplus)</td>
</tr>
<tr>
<td>控制</td>
<td>OmniH2O</td>
<td>CoRL 2024</td>
<td>[GitHub](https://github.com/CMU-GKG/OmniH2O)</td>
</tr>
<tr>
<td>控制</td>
<td>Mobile ALOHA</td>
<td>arXiv 2024</td>
<td>[GitHub](https://github.com/MarkFzp/mobile-aloha)</td>
</tr>
<tr>
<td>控制</td>
<td>ACT</td>
<td>CoRL 2023</td>
<td>[GitHub](https://github.com/tonyzhaozh/act)</td>
</tr>
<tr>
<td>控制</td>
<td>UMI</td>
<td>RSS 2024</td>
<td>[GitHub](https://github.com/real-stanford/universal_manipulation_interface)</td>
</tr>
<tr>
<td>控制</td>
<td>H2O</td>
<td>CoRL 2023</td>
<td>[GitHub](https://github.com/ZhengyiLuo/H2O)</td>
</tr>
<tr>
<td>控制</td>
<td>3D Diffuser Actor</td>
<td>CoRL 2024</td>
<td>[GitHub](https://github.com/nickgkan/3d_diffuser_actor)</td>
</tr>
<tr>
<td>控制</td>
<td>Expressive Locomotion</td>
<td>RSS 2024</td>
<td>[GitHub](https://github.com/hybridrobotics/berkeley-humanoid)</td>
</tr>
<tr>
<td>综述</td>
<td>Awesome Humanoid (550+ Papers)</td>
<td>GitHub</td>
<td>[GitHub](https://github.com/YanjieZe/awesome-humanoid-robot-learning)</td>
</tr>
<tr>
<td>综述</td>
<td>Sim2Real Survey</td>
<td>IEEE T-RO 2023</td>
<td>[IEEE](https://ieeexplore.ieee.org)</td>
</tr>
<tr>
<td>综述</td>
<td>VLA Survey</td>
<td>arXiv 2025</td>
<td>[arXiv](https://arxiv.org)</td>
</tr>
<tr>
<td>综述</td>
<td>Humanoid Survey</td>
<td>AR 2025</td>
<td>[arXiv](https://arxiv.org)</td>
</tr>
<tr>
<td>综述</td>
<td>Imitation Learning Survey</td>
<td>AR 2024</td>
<td>[arXiv](https://arxiv.org)</td>
</tr>
<tr>
<td>综述</td>
<td>Deep RL for Robotics</td>
<td>IEEE T-RO 2021</td>
<td>[arXiv](https://arxiv.org)</td>
</tr>
<tr>
<td>文献</td>
<td>PPO</td>
<td>arXiv 2017</td>
<td>[arXiv](https://arxiv.org/abs/1707.06347)</td>
</tr>
<tr>
<td>文献</td>
<td>AlphaPose</td>
<td>ICCV 2021</td>
<td>[GitHub](https://github.com/MVIG-SJTU/AlphaPose)</td>
</tr>
<tr>
<td>文献</td>
<td>3D Diffusion Policy</td>
<td>CoRL 2024</td>
<td>[GitHub](https://github.com/nickgkan/3d_diffuser_actor)</td>
</tr>
<tr>
<td>文献</td>
<td>RFT (LLM微调)</td>
<td>arXiv 2024</td>
<td>[arXiv](https://arxiv.org)</td>
</tr>
</tbody>
</table>


### 技术百科 (18 术语)

<table>
<thead>
<tr>
<th width="33%">类别</th>
<th width="33%">术语</th>
<th width="33%">核心概念</th>
</tr>
</thead>
<tbody>
<tr>
<td>机械结构</td>
<td>关节重定向</td>
<td>IK/AMP/学习三种方法，质量评估四指标</td>
</tr>
<tr>
<td>嵌入式硬件</td>
<td>驱动关节电机</td>
<td>BLDC(100-360Nm)/舵机(1-10Nm)/QDD(5-40Nm)，厂商+选型</td>
</tr>
<tr>
<td>嵌入式硬件</td>
<td>主控与计算</td>
<td>Jetson Orin/STM32/树莓派双层架构，实时性要求</td>
</tr>
<tr>
<td>嵌入式硬件</td>
<td>IMU 惯性测量</td>
<td>ICM-20948/BMI088/MPU6050 对比，AHRS 姿态估计</td>
</tr>
<tr>
<td>嵌入式硬件</td>
<td>通信总线</td>
<td>EtherCAT/CAN-FD/CAN2.0/TTL 四层对比</td>
</tr>
<tr>
<td>嵌入式软件</td>
<td>实时控制中间件</td>
<td>FOC→PID→WBC解算→MPC 调用链</td>
</tr>
<tr>
<td>仿真</td>
<td>仿真器全景对比</td>
<td>MuJoCo/Isaac/Genesis/Gazebo/Newton 5款横向对比</td>
</tr>
<tr>
<td>仿真</td>
<td>Sim2Real 迁移</td>
<td>域随机化/Sim2Sim校验/残差策略/域迁移/系统辨识</td>
</tr>
<tr>
<td>仿真</td>
<td>域随机化</td>
<td>8 种参数范围 + 难度递进策略</td>
</tr>
<tr>
<td>RL算法</td>
<td>Actor-Critic</td>
<td>A2C/A3C/SAC/TD3/PPO 五变体对比</td>
</tr>
<tr>
<td>RL算法</td>
<td>PPO</td>
<td>Clip 机制 + GAE + 标准配置(γ=0.99, λ=0.95)</td>
</tr>
<tr>
<td>RL算法</td>
<td>扩散策略/流匹配</td>
<td>DDPM vs Flow Matching，推理步数 100-1000 vs 10-50</td>
</tr>
<tr>
<td>神经网络</td>
<td>MLP/Transformer/MoE</td>
<td>三种架构在人形RL/VLA中的应用场景</td>
</tr>
<tr>
<td>激活函数</td>
<td>ELU/ReLU/GELU/SiLU</td>
<td>RL选ELU，VLA选GELU/SiLU，原因分析</td>
</tr>
<tr>
<td>基础设施</td>
<td>GPU并行化训练</td>
<td>Isaac Lab vs MuJoCo MJX，4096 vs 32768 envs</td>
</tr>
<tr>
<td>基础设施</td>
<td>WBC全身控制</td>
<td>优化型/学习型/混合型，任务优先级四层</td>
</tr>
<tr>
<td>VLA模型</td>
<td>VLA 三种范式</td>
<td>端到端/分层(Dual-System)/解耦</td>
</tr>
<tr>
<td>VLA模型</td>
<td>遥操作数据采集</td>
<td>AVP/Quest/动捕/主从/Leader-Follower 六方案对比</td>
</tr>
</tbody>
</table>


---

## 发展里程碑

2024.03 Humanoid-Gym → 2024.06 HumanPlus → 2024.07 青龙公版机 → 2024.12 Genesis/AgiBot World → 2025.03 GR00T N1/格物 → 2025.04 灵犀 X1 → 2025.05 openpi/Berkeley Lite → 2025.06 MuJoCo Playground/ASAP → 2025.10 openpi微调/Eureka → 2025.11 HoloMotion → 2025.12 Dexora/Fourier N1 → 2026.01 roboto_origin/LingBot-VLA → 2026.03 灵渠OS/Asimov → 2026.04 Psi-Zero/灵龙2.0 → 2026.05 LeRobot/GR00T N1.7 → 2026.06 HEX/Dexora(ICRA) → 2026.07 LingBot-World 2.0/Party OS

---

## 本地运行

```bash
git clone https://github.com/bbhliheyi/humanoid-eco-nav.git
cd humanoid-eco-nav && npm install && npm run dev
```
