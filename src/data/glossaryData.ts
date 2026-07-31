import { GlossaryTerm, GlossaryTreeNode } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ==================== 机械结构与建模 ====================
  {
    id: 'glossary-retargeting',
    term: '关节重定向 (Motion Retargeting)',
    englishName: 'Motion / Joint Retargeting',
    path: ['机械结构与建模'],
    difficulty: '进阶',
    definition: '将人体运动捕捉数据映射到不同运动学结构的人形机器人关节空间。解决"如何让机器人复现人类动作"的映射问题——因为机器人关节数量、构型、连杆长度与人体不同。',
    detail: `为什么需要
人体约 244 个自由度，人形机器人通常只有 20-40 个。关节构型不同（人类肩是球窝，机器人是串联旋转），连杆比例也不同，关节还有硬限位。

三种主流方法

1. 基于优化的重定向（最常用）
用逆运动学 IK 或数值优化求解机器人关节角。目标函数最小化人体关节点与机器人对应点的位置误差，约束关节限位、自碰撞和足端接触一致性。
代表：HumanPlus (Stanford)、OmniH2O (CMU/NVIDIA)

2. 基于学习的重定向
训练神经网络直接将人类姿态映射为机器人关节角，可处理遮挡和噪声。
代表：GEAR-SONIC (NVIDIA)，700 小时动捕数据预训练

3. RL 隐式重定向
不需要显式求解重定向，用 AMP 对抗运动先验或 Style Reward 引导策略模仿参考运动风格。
代表：legged_gym AMP、Berkeley Humanoid Expressive Locomotion (RSS 2024)

质量评估指标
关节位置误差 MPJPE —— 平均每关节位置误差
足端接触一致性 —— 支撑/摆动相位是否匹配
质心轨迹误差 —— 全身平衡保持能力
动作语义保持 —— 高层动作含义是否保留`,
    robotApplication: 'HumanPlus 用单目 RGB 实时重定向；OmniH2O 支持 VR/动捕/单目多种输入；GEAR-SONIC 700 小时动捕预训练。在遥操作数据采集中，重定向是连接人类操作者与机器人执行的关键桥梁。',
    relatedTerms: ['运动学', 'IK', 'AMP', 'WBC', '遥操作'],
    relatedProjectIds: ['amp-mimic', 'open-television', 'gear-sonic'],
    keyPapers: [
      { title: 'HumanPlus: Shadowing and Imitation from Humans', venue: 'CoRL 2024 Oral', year: '2024' },
      { title: 'OmniH2O: Universal Whole-Body Teleoperation', venue: 'CoRL 2024', year: '2024' },
    ],
    formula: 'q* = argmin Σ||f_i(q) - p_i||²  s.t. q_min ≤ q ≤ q_max'
  },

  // ==================== 嵌入式硬件系统 ====================
  {
    id: 'glossary-motors',
    term: '驱动关节与电机',
    englishName: 'Actuators & Motors',
    path: ['嵌入式硬件系统'],
    difficulty: '入门',
    definition: '人形机器人的肌肉——将电能转换为关节运动。电机选型直接决定负载能力、运动精度、能效和成本。三大主流类型各有适用场景。',
    detail: `一、BLDC 力矩电机（无刷直流）
原理：永磁转子 + 电子换向，通过 FOC 磁场定向控制实现高精度力矩输出
扭矩密度：最高，可达 100-360 Nm
控制方式：CAN 或 EtherCAT 总线，支持位置/速度/力矩三环控制
用途：大型人形机器人的膝关节、髋关节（宇树 H1、傅利叶 GR-2、PAL TALOS）
代表厂商：宇树自研 M107、傅利叶 FSA、MAXON（瑞士）、T-Motor

二、串行总线舵机（Dynamixel / Feetech）
原理：直流电机 + 减速器 + 驱动板 + 反馈电位计集成在一个模块里
扭矩：1-10 Nm，属于中小扭矩
控制方式：TTL 或 RS485 串行指令，支持位置和速度控制
用途：小型桌面级人形、机械臂手指（LeRobot、K-Bot、Reachy 2）
代表厂商：ROBOTIS（韩国，Dynamixel 系列）、飞特 Feetech（中国，STS/SCS 系列）

三、准直驱电机 QDD（Quasi-Direct Drive）
原理：低传动比 1:5 到 1:10，本体感知，不需要额外的力矩传感器
扭矩：5-40 Nm
特点：高带宽力控、抗冲击能力强、成本低
用途：Berkeley Humanoid Lite、MIT Cheetah 技术体系
代表厂商：T-Motor AK 系列

关键指标
峰值扭矩：最大输出力矩，膝关节典型 50-360 Nm
扭矩密度：单位重量的力矩输出，越高越好
控制带宽：响应速度，力控要求大于 500Hz
反向驱动性：外力能推动关节的能力 —— QDD 最好，BLDC 次之，舵机最差`,
    robotApplication: '大型人形（宇树 H1、傅利叶 GR-2、PAL TALOS）用 BLDC；桌面级（LeRobot、K-Bot）用 Dynamixel 舵机；极低成本方案（Berkeley Lite）用 QDD。',
    relatedTerms: ['CAN总线', 'EtherCAT', 'FOC控制', 'IMU'],
    relatedProjectIds: ['roboto-origin', 'unitree-h1', 'berkeley-lite', 'fourier-n1'],
    formula: 'τ = K_t × I    （力矩 = 力矩常数 × 电流）'
  },
  {
    id: 'glossary-compute',
    term: '主控与计算模块',
    englishName: 'Compute Modules',
    path: ['嵌入式硬件系统'],
    difficulty: '入门',
    definition: '人形机器人的大脑，分为两层：上层跑 AI 推理和 ROS2（Jetson、树莓派、Intel），底层跑 1kHz+ 实时关节伺服（STM32、MCU、DSP）。',
    detail: `上层 —— AI 感知与规划（100-1000Hz）
NVIDIA Jetson AGX Orin：275 TOPS 算力，功耗 15-60W，用于 VLA 推理和视觉 SLAM
NVIDIA Jetson Orin NX：100 TOPS，功耗 10-25W，宇树 G1/H1 的标配
树莓派 5：约 0.01 TOPS，功耗 5-10W，桌面级和教育平台
Intel Core i7：纯 CPU，功耗 15-28W，PAL TALOS 和 Agility Digit 使用
华为昇腾 Atlas 200：22 TOPS，功耗 5.5W，乐聚 KUAVO（华为生态）

底层 —— 实时控制（1kHz-10kHz）
STM32F4/F7/H7：ARM Cortex-M 系列，最主流的开源选择，跑关节伺服和 CAN 通信
TI C2000/TMS320：DSP 架构，用于高精度 FOC 电机控制
自研 FPGA/ASIC：特斯拉、Figure 等闭源方案

实时性要求
关节力矩控制环：大于 1kHz
全身 WBC 解算：200-500Hz
IMU 状态估计：500-1000Hz
视觉 SLAM：30-60Hz`,
    robotApplication: '开源平台多用 Jetson Orin + STM32H7 组合；低成本方案用树莓派 + Teensy；工业级方案用自研控制器。',
    relatedTerms: ['ROS2', 'EtherCAT', 'CAN总线', '实时控制'],
    relatedProjectIds: ['roboto-origin', 'unitree-h1', 'agibot-x1'],
  },
  {
    id: 'glossary-imu-detail',
    term: 'IMU 惯性测量单元',
    englishName: 'Inertial Measurement Unit',
    path: ['嵌入式硬件系统'],
    difficulty: '入门',
    definition: '人形机器人的内耳前庭——实时测量身体加速度和角速度，是姿态估计和平衡控制的基础传感器。关键要求：低噪声、高带宽、抗振动。',
    detail: `核心参数
陀螺仪量程：推荐 ±2000 dps
加速度计量程：推荐 ±16g
陀螺零偏稳定性：长期漂移，工业级小于 2°/h
噪声密度：短期噪声，小于 0.01 dps/√Hz
输出频率：更新率要求大于 500Hz

主流型号对比
ICM-20948（TDK InvenSense）：9 轴含磁力计，roboto_origin 和 Asimov 使用
ICM-42688-P（TDK InvenSense）：低噪声 6 轴，Booster T1 使用
BMI088（Bosch Sensortec）：工业级抗振动，AgiBot X1 使用
MPU6050（TDK InvenSense）：经典入门级，Berkeley Lite 和 K-Bot 使用
自研融合 IMU：各厂商多 IMU 冗余 + 在线标定，宇树 H1/G1、傅利叶 GR-2 采用

姿态估计（AHRS）
IMU 数据通过 Madgwick、Mahony 或卡尔曼滤波器融合为四元数姿态，输出 roll/pitch/yaw。人形机器人仅靠 IMU 无法获得准确的 yaw，需要磁力计或视觉辅助。`,
    robotApplication: '几乎所有平台标配 IMU。工业级用 BMI088；入门级用 MPU6050 或 ICM-20948。宇树和傅利叶自研多 IMU 融合方案。',
    relatedTerms: ['姿态估计', '卡尔曼滤波', '传感器融合'],
    relatedProjectIds: ['roboto-origin', 'agibot-x1', 'unitree-h1'],
  },
  {
    id: 'glossary-communication',
    term: '通信总线与协议',
    englishName: 'Communication Buses & Protocols',
    path: ['嵌入式硬件系统'],
    difficulty: '进阶',
    definition: '人形机器人的神经系统——连接各个关节电机、传感器和计算模块。不同层级用不同总线：关节级用 CAN 或 EtherCAT 保证实时性，上层用 ROS2/DDS 实现分布式通信。',
    detail: `第一层：关节级通信（1kHz+，硬实时）
EtherCAT：带宽 100Mbps，延迟小于 100 微秒，菊花链拓扑。工业级方案（智元、傅利叶、PAL TALOS）的首选
CAN-FD：带宽 8Mbps，延迟约 1ms，总线型拓扑。中端方案（宇树 H1/G1、Booster）使用
CAN 2.0：带宽 1Mbps，延迟约 5ms。入门级方案（roboto_origin、Asimov）使用
TTL / RS485：带宽 1-4Mbps，延迟约 10ms。舵机级方案（LeRobot、K-Bot）使用

第二层：板间通信（百 Hz，软实时）
CycloneDDS：宇树 SDK 底层，亚毫秒级 ROS2 通信
AimRT：智元自研中间件，专为具身智能优化
ROS2 Humble：社区标准，DDS 实现

第三层：外部通信
WiFi6 / 5G：遥操作、云端 VLA 推理
蓝牙：手柄连接、近距离配置

关键概念
菊花链（Daisy Chain）：设备逐个串联，减少线缆但单点故障影响大
TSN（时间敏感网络）：以太网确定性延迟，工业级必备
DDS（数据分发服务）：去中心化发布/订阅，ROS2 的底层通信机制`,
    robotApplication: '工业级（智元、傅利叶）用 EtherCAT；中端（宇树）用 CAN-FD；入门级（roboto_origin、Asimov）用 CAN 2.0 加 UART。ROS2 / CycloneDDS 是上层通信的事实标准。',
    relatedTerms: ['ROS2', 'EtherCAT', '实时控制', '中间件'],
    relatedProjectIds: ['unitree-h1', 'agibot-x1', 'openloong', 'roboto-origin'],
  },

  // ==================== 嵌入式软件 ====================
  {
    id: 'glossary-middleware',
    term: '实时控制与中间件',
    englishName: 'Real-Time Control & Middleware',
    path: ['嵌入式软件'],
    difficulty: '进阶',
    definition: '人形机器人的小脑——运行在底层 MCU 上的实时控制软件和上层 SoC 上的机器人中间件。负责将 VLA 等高层决策转化为每个关节的力矩或位置指令。',
    detail: `底层固件 —— MCU 端，大于 1kHz
FOC 控制：磁场定向控制算法，将力矩指令转为三相电流
关节伺服：PID 或 ADRC 闭环控制
前馈补偿：重力补偿、摩擦补偿、科氏力补偿
状态估计：IMU 和编码器的卡尔曼滤波融合

中间层 —— SoC 端，200-500Hz
WBC 解算：多任务优先级优化，平衡优于操作优于姿态
MPC 步态：模型预测控制生成步态轨迹
通信管理：EtherCAT 或 CAN 总线调度
安全监控：关节限位、碰撞检测、急停

上层框架 —— SoC 端，30-100Hz
ROS2 / ROS：节点化机器人框架，社区标准
AimRT：智元高性能中间件
Party OS：roboto_origin 生态系统
灵渠 OS：智元灵犀 X1 系统内核
Booster Studio IDE：图形化编程环境

实时性保证方案
RT-Preempt Linux：内核级实时补丁
FreeRTOS：跑在 MCU 上的轻量实时操作系统
Xenomai：Linux 双内核实时方案`,
    robotApplication: '开源生态中 AimRT（智元）和 Party OS（roboto_origin）是最活跃的中间件项目。Unitree SDK2（CycloneDDS）是宇树生态的通信核心。',
    relatedTerms: ['WBC', 'ROS2', 'EtherCAT', '通信总线'],
    relatedProjectIds: ['aimrt', 'groot-wbc', 'ocs2-pinocchio'],
  },

  // ==================== 仿真与物理引擎 ====================
  {
    id: 'glossary-simulators',
    term: '仿真器全景对比',
    englishName: 'Simulator Comparison',
    path: ['仿真与物理引擎'],
    difficulty: '入门',
    definition: '人形机器人的数字试验场。不同仿真器在物理精度、GPU 加速、渲染质量和 RL 支持方面差异显著，选型直接影响训练效率和 Sim2Real 成功率。',
    detail: `MuJoCo MJX（Google DeepMind）
物理引擎：MuJoCo 自研，GPU 加速用 JAX
并行环境数：32768+，是所有仿真器中规模最大的
可微分物理：支持一阶微分
ROS 集成：需要桥接
训练速度（G1 步态）：约 15-30 分钟，最快
许可证：Apache-2.0 完全开源

Isaac Sim（NVIDIA）
物理引擎：PhysX 5，GPU 加速用 CUDA
并行环境数：4096-8192
渲染质量：RTX 光追级，是视觉 VLA 训练的首选
ROS 集成：原生 ROS2 Bridge
训练速度（G1 步态）：约 2-4 小时
许可证：SDK 和 API 开源，核心渲染引擎免费但闭源

Genesis World
物理引擎：统一物理（刚体 + 柔体 + 液体 + 气体）
并行环境数：10000+
可微分物理：全可微
许可证：Apache-2.0 完全开源
注意：生态较年轻，社区不如 MuJoCo 和 Isaac 成熟

Gazebo（Classic / Ignition / Harmonic）
物理引擎：ODE、Bullet、DART 可选
并行环境数：1-10（CPU 仿真，无法做大规模 RL 训练）
ROS 集成：原生 ROS2 集成，ROS 生态标准仿真器
适用场景：多传感器系统联调（LiDAR、相机、IMU），不是 RL 训练工具

选型建议
纯 RL 步态和运控训练 → MuJoCo MJX（最快）
VLA 视觉-语言-动作训练 → Isaac Sim（光追级渲染）
学术可微分物理研究 → Genesis 或 MuJoCo
ROS 多传感器系统联调 → Gazebo Ignition`,
    robotApplication: 'RL 训练的事实标准是 Isaac Lab（NVIDIA）或 MuJoCo Playground（DeepMind）。VLA 训练用 Isaac Sim 做视觉渲染。Genesis 正在快速追赶。Gazebo 用于传统 ROS 集成测试。',
    relatedTerms: ['Sim2Real', '域随机化', 'GPU并行化', 'VLA'],
    relatedProjectIds: ['isaac-sim', 'mujoco', 'genesis-world', 'gewu-unity', 'isaac-lab'],
    keyPapers: [
      { title: 'MuJoCo: A physics engine for model-based control', venue: 'IROS 2012', year: '2012' },
      { title: 'Genesis: A Universal Physics Engine for Robotics', venue: 'arXiv', year: '2024' },
    ]
  },
  {
    id: 'glossary-sim2real',
    term: 'Sim2Real 迁移',
    englishName: 'Sim-to-Real Transfer',
    path: ['仿真与物理引擎'],
    difficulty: '进阶',
    definition: '在仿真中训练策略然后部署到真实机器人上的技术范式。核心挑战是 Sim2Real Gap——仿真与真实物理之间的差异。五种主流技术从不同角度弥合这个差距。',
    detail: `Sim2Real Gap 的四个来源
动力学差异：仿真物理参数（质量、摩擦、接触刚度）与真实世界不匹配
感知差异：仿真渲染图像与真实相机图像的视觉分布偏移
延迟差异：仿真中零延迟 vs 真机通信和计算的亚毫秒级延迟
噪声差异：真实传感器的噪声分布难以精确建模

五种弥合技术

1. 域随机化 —— 最广泛使用
训练时随机扰动物理参数（质量 ±30%、摩擦系数 ±50% 等），迫使策略对各种动力学都具有鲁棒性。legged_gym 的成功很大程度上归功于精心设计的域随机化。

2. Sim2Sim 校验
先在仿真器 A（如 Isaac Gym）训练，再在仿真器 B（如 MuJoCo）验证。通过双仿真对比发现过拟合。Humanoid-Gym（星动纪元）首创。

3. 残差策略（ASAP）
在真机上运行时，通过在线学习残差动作来补偿仿真误差。ASAP（LeCAR-Lab, RSS 2025）的代表性工作。

4. 域迁移（Cosmos-Transfer）
使用生成式模型将仿真渲染图翻译为真实感图像，消除视觉 Sim2Real 差距。NVIDIA Cosmos-Transfer 是代表。

5. 系统辨识
通过少量真机数据标定仿真参数（关节静摩擦、电机转矩常数），让仿真更接近真机。`,
    robotApplication: 'legged_gym + Domain Rand 是标准范式。Humanoid-Gym 首创 Sim2Sim 校验。ASAP 引入残差修正突破 Gap 瓶颈。',
    relatedTerms: ['域随机化', 'ASAP', 'Cosmos-Transfer'],
    relatedProjectIds: ['isaac-lab', 'legged-gym', 'humanoid-gym', 'asap'],
    formula: 'π_real ≈ π_sim + π_residual    （ASAP 范式：真实策略 ≈ 仿真策略 + 残差修正）'
  },
  {
    id: 'glossary-domain-rand',
    term: '域随机化',
    englishName: 'Domain Randomization',
    path: ['仿真与物理引擎'],
    difficulty: '入门',
    definition: '消除 Sim2Real Gap 最主流的训练技术。每个训练回合开始时随机扰动物理参数（质量、摩擦、质心、电机响应、观测噪声），迫使策略学习对参数分布鲁棒的泛化行为。',
    detail: `典型随机化参数（legged_gym / Isaac Lab 标准配置）
连杆质量：在标称值的 ±30% 范围内均匀随机
地面摩擦系数：在 0.2 到 2.0 之间均匀随机
质心偏移：以标称位置为中心，±5cm 正态随机
电机力矩常数：标称值的 ±15% 均匀随机
关节阻尼：标称值的 0.5 到 2.0 倍，对数均匀随机
观测噪声（编码器）：标准差 0.01 弧度的高斯噪声
观测噪声（IMU）：标准差 0.05 m/s² 的高斯噪声
外部推力：0 到 200N 的随机脉冲，按泊松过程施加
地形高度：0 到 15cm 的 Perlin 噪声随机起伏

实施要点
难度递进：从平坦地面开始，逐步增加随机化程度
最终冻结：训练末尾几百万步关闭随机化，让策略收敛到参数均值
DR 不足：策略泛化差，真机表现不稳定
DR 过度：策略过于保守，动作僵硬、效率低`,
    robotApplication: 'legged_gym 的成功很大程度上归功于域随机化。NVIDIA Isaac Lab 将其系统化为可配置的 Domain Randomization Manager。',
    relatedTerms: ['Sim2Real', 'ASAP', 'Sim2Sim校验'],
    relatedProjectIds: ['isaac-lab', 'legged-gym', 'unitree-rl-gym'],
    formula: 'θ_episode ~ P(θ̄ + Δθ),  Δθ ~ Uniform(-r, r)'
  },

  // ==================== 强化学习算法 ====================
  {
    id: 'glossary-actor-critic',
    term: 'Actor-Critic 架构',
    englishName: 'Actor-Critic Architecture',
    path: ['强化学习算法'],
    difficulty: '入门',
    definition: '深度强化学习的核心架构范式。Actor（演员）负责输出动作，Critic（评论家）负责评估价值，两者互相协作提升。人形机器人的高维连续动作空间天然适合此范式。',
    detail: `Actor（策略网络）
输入状态 s，输出动作 a。连续控制通常输出高斯分布的均值和标准差。
目标：最大化 Critic 给出的优势加权期望回报。

Critic（价值网络）
输入状态 s，输出当前状态开始能获得的期望累积奖励 V(s)。
目标：最小化 TD 误差，让价值估计越来越准确。

训练流程
1. Actor 采样动作，环境返回奖励和新状态
2. Critic 计算 TD 误差：当前奖励 + 未来折扣价值 - 当前价值估计
3. Actor 按"TD 误差 × 策略梯度"方向更新，好于预期的动作被加强
4. Critic 按最小化 TD 误差平方的方向更新

五种主要变体
A2C：同步多环境并行，用优势函数减方差。Isaac Lab 的默认范式
A3C：异步多 worker，每个 worker 独立更新。早期方案，现已较少使用
SAC：最大熵 RL，自动调节探索程度。适合灵巧操作任务
TD3：双 Q 网络加延迟策略更新。适合力矩级精确控制
PPO：用 Clip 限制更新幅度。人形机器人的主流选择`,
    robotApplication: '所有人形训练框架（Isaac Lab、legged_gym、HumanoidVerse）的底层架构。PPO 是目前经过大规模 Sim2Real 验证的唯一选择。',
    relatedTerms: ['PPO', 'SAC', 'TD3', 'GAE', 'TD误差'],
    relatedProjectIds: ['isaac-lab', 'legged-gym', 'skrl'],
    formula: '∇J = E[ ∇log π(a|s) · A(s,a) ]'
  },
  {
    id: 'glossary-ppo',
    term: 'PPO（近端策略优化）',
    englishName: 'Proximal Policy Optimization',
    path: ['强化学习算法'],
    difficulty: '入门',
    definition: '当前人形机器人 RL 训练最主流的策略梯度算法（OpenAI 2017）。通过 Clip 机制限制每次策略更新幅度，防止策略崩坏，实现稳定高效训练。几乎所有开源人形项目以此为首选。',
    detail: `两个关键技术
Clipped Surrogate Objective（剪切代理目标）
限制新旧策略之间的概率比率在 0.8 到 1.2 区间内（ε = 0.2），防止单步更新过大导致策略崩溃。
Adaptive KL Penalty（自适应 KL 散度惩罚）
在 PPO-Penalty 变体中动态调整 KL 散度的惩罚系数。

PPO 是 Actor-Critic 架构的实例，包含两个网络：
Actor 网络输出动作分布（给定状态下选择各动作的概率）
Critic 网络估计状态价值 V(s)，用于计算优势函数
优势函数衡量某个动作比平均水平好多少：A(s, a) = Q(s, a) - V(s)

PPO vs TRPO
PPO 用简单的 Clip 操作替代了 TRPO 中复杂的二阶优化（共轭梯度加线搜索），实现极简（仅需几行 PyTorch），效果几乎相当。因此实际工程中 PPO 已全面替代 TRPO。

标准配置
折扣因子 γ = 0.99
GAE 参数 λ = 0.95
Clip 范围 ε = 0.2
优化器：Adam，学习率 3e-4`,
    robotApplication: 'Isaac Lab、legged_gym、unitree_rl_gym、Humanoid-Gym 均以 PPO 为默认算法。在 G1 29-DoF 人形、H1 全身控制、roboto_origin 步态训练中，PPO 是目前唯一经过大规模 Sim2Real 验证的 RL 算法。',
    relatedTerms: ['Actor-Critic', 'GAE', 'TRPO', '优势函数'],
    relatedProjectIds: ['isaac-lab', 'legged-gym', 'unitree-rl-gym', 'humanoid-gym'],
    keyPapers: [
      { title: 'Proximal Policy Optimization Algorithms', venue: 'arXiv 2017 (OpenAI)', year: '2017' },
    ],
    formula: 'L = E[ min(r·A, clip(r, 0.8, 1.2)·A) ]    其中 r 是新旧策略概率比，A 是优势函数'
  },
  {
    id: 'glossary-sac',
    term: 'SAC（软演员-评论家）',
    englishName: 'Soft Actor-Critic',
    path: ['强化学习算法'],
    difficulty: '进阶',
    definition: '最大熵强化学习算法。在最大化回报的同时最大化策略的熵值（随机性），从而实现更鲁棒的探索。使用双 Q 网络防止价值高估，自动调节温度参数平衡探索与利用。',
    detail: `核心思想
在标准 RL 目标中加入熵项：目标 = 累积奖励 + 温度参数 × 策略熵值
温度参数 α 自动调节。α 大 → 多探索（随机行为），α 小 → 多利用（确定行为）

三个关键网络
Actor 策略网络：输出动作的高斯分布（均值和方差）
双 Critic 网络：两个独立的 Q 网络，取最小值防止价值高估
Target Q 网络：通过软更新（Polyak 平均）缓慢跟踪，稳定训练

适用场景
SAC 在需要多模态行为时优于 PPO——例如灵巧手抓取不同形状物体、人形机器人多种步态之间切换。因为 SAC 的随机策略天然支持多种合理动作，而 PPO 倾向于收敛到单一策略。`,
    robotApplication: '在 Dexora 36-DoF 灵巧手中，SAC 配合 Demo Augmentation 实现高成功率操作。在需要多样化行为的任务上优于 PPO，但工程实现比 PPO 复杂。',
    relatedTerms: ['Actor-Critic', 'PPO', 'TD3'],
    relatedProjectIds: ['dexora', 'skrl'],
    formula: 'J = Σ[ r + α·H(π) ]    同时最大化累积奖励和策略熵'
  },
  {
    id: 'glossary-trpo',
    term: 'TRPO（信任域策略优化）',
    englishName: 'Trust Region Policy Optimization',
    path: ['强化学习算法'],
    difficulty: '进阶',
    definition: 'PPO 的前身算法（Schulman et al., 2015）。通过 KL 散度硬约束确保策略更新在信任域内，理论上更优雅。但实现需要共轭梯度、线搜索等复杂的二阶优化，实际工程中已被 PPO 全面替代。',
    detail: `核心约束
最大化策略期望回报，同时约束新旧策略之间的 KL 散度不超过阈值 δ（通常 0.01）。
需要计算 Fisher 信息矩阵并求解 Hessian-vector 乘积，计算开销远大于 PPO。

PPO 如何超越 TRPO
PPO 用简单的 Clip 操作替代了 TRPO 中所有复杂的二阶优化——只需几行 PyTorch 代码即可实现。在几乎所有基准测试中，PPO 的效果与 TRPO 相当或更好，但实现和调参难度降低了几个数量级。

目前的使用情况
仅有极少数科研机构在需要严格理论收敛保证的场景使用 TRPO。实际工程中 PPO 是唯一的选择。了解 TRPO 的意义主要在于理解 PPO 的设计动机。`,
    robotApplication: '实际工程中 PPO 已全面替代。仅在需要严格理论保证的科研场景偶有使用。',
    relatedTerms: ['PPO', 'KL散度', '信任域'],
    relatedProjectIds: ['legged-gym'],
    formula: 'max L(θ)  s.t.  E[KL(π_old || π_θ)] ≤ δ'
  },
  {
    id: 'glossary-gae',
    term: 'GAE（广义优势估计）',
    englishName: 'Generalized Advantage Estimation',
    path: ['强化学习算法'],
    difficulty: '进阶',
    definition: 'PPO 和 Actor-Critic 中计算优势函数的核心技术（Schulman et al., 2016）。通过指数加权平均多步 TD 误差，在偏差（低方差）和方差（无偏）之间取得平衡，是 PPO 稳定训练的关键组件。',
    detail: `什么是优势函数
策略梯度需要一个衡量"这个动作比平均水平好多少"的信号。这个信号可以是：
回报 Return：无偏但方差极高（每个动作的好坏混入了后续所有随机性）
TD 残差：低方差但有偏（只看一步，忽略了长期影响）
GAE：两者的指数加权折衷

GAE 公式
GAE = Σ (γλ)^k × δ_{t+k}
其中 δ_t 是 t 时刻的 TD 误差，γ 是折扣因子，λ 是 GAE 参数

λ 参数的含义
λ = 0：等价于只看一步 TD（低方差，高偏差）
λ = 1：等价于 Monte Carlo 完整回报（无偏，高方差）
λ = 0.95：人形 RL 最常用的值，在两者间取得良好平衡

标准 PPO 配置
γ = 0.99（折扣因子）
λ = 0.95（GAE 参数）
这两个值在所有开源人形 RL 项目中几乎固定不变。`,
    robotApplication: 'PPO 的标准组件。所有使用 PPO 的人形项目（Isaac Lab、legged_gym、unitree_rl_gym、Humanoid-Gym）均使用 GAE。',
    relatedTerms: ['PPO', 'Actor-Critic', '优势函数'],
    relatedProjectIds: ['isaac-lab', 'legged-gym'],
    formula: 'Â_t = Σ (γλ)^k × δ_{t+k}    指数加权多步 TD 误差'
  },
  {
    id: 'glossary-diffusion-policy',
    term: '扩散策略（Diffusion Policy）',
    englishName: 'Diffusion Policy',
    path: ['强化学习算法'],
    difficulty: '进阶',
    definition: '借鉴图像生成中的去噪扩散模型（DDPM），将动作生成建模为逐步去噪过程。相比传统高斯策略，能表达多模态动作分布——同一状态可以生成多种合理动作（如抓取 vs 推动）。',
    detail: `三步流程
前向扩散：向真实动作逐步添加高斯噪声，T 步后变为纯噪声
反向去噪：训练网络从噪声中一步步恢复原始动作
推理：在实际使用时从纯噪声出发，逐步去噪生成最终动作序列

为什么适合人形机器人
多模态动作：同一状态可能需要完全不同但都合理的动作
平滑性好：逐步去噪保证生成的关节轨迹平滑连续
可调节：通过改变去噪步数在速度和生成质量之间取得平衡

扩散策略与流匹配的关系
扩散策略是随机微分方程（SDE），推理需要 100-1000 步去噪
流匹配是常微分方程（ODE），推理只需 10-50 步积分
流匹配是扩散策略的进化版，速度更快且可逆`,
    robotApplication: 'RDT-1B、π0 (openpi)、HEX VLA 均使用扩散或流匹配策略头。在 Dexora 灵巧操作中，扩散策略在需要高精度接触的任务上优于传统 PPO。',
    relatedTerms: ['流匹配', 'DDPM', 'VLA'],
    relatedProjectIds: ['openpi', 'hex-vla', 'rdt2', 'dexora'],
    formula: 'p(a_{t-1}|a_t, s) = N(a_{t-1}; μ(a_t, s, t), σ_t²)    逐步去噪生成动作'
  },
  {
    id: 'glossary-flow-matching',
    term: '流匹配（Flow Matching）',
    englishName: 'Flow Matching',
    path: ['强化学习算法'],
    difficulty: '深入',
    definition: '生成模型的新范式——学习从简单分布到目标动作轨迹的连续向量场（ODE 速度场）。相比扩散策略，推理步数少 10-50 倍。Physical Intelligence 的 π0 和 Open-X-Humanoid 的 HEX 均采用此方案。',
    detail: `扩散策略 vs 流匹配
数学基础：扩散用随机微分方程 SDE，流匹配用常微分方程 ODE
推理步数：扩散 100-1000 步，流匹配 10-50 步
可逆性：扩散不可逆，流匹配可逆（可双向计算概率密度）
训练方式：扩散预测噪声，流匹配预测速度方向

训练流程
1. 从真实数据分布和噪声分布各采样一个点
2. 在两点之间构造线性插值路径
3. 训练网络预测路径上每个点的速度方向（即去噪方向）
4. 推理时用 ODE Solver（欧拉法或 RK4）沿速度场积分生成动作

为什么 π0 选择流匹配
Physical Intelligence 选流匹配而非扩散，三个原因：
推理速度快 10-50 倍，适合机器人实时控制
可逆设计方便做动作序列的概率密度估计
天然适合 VLA 多模态条件生成（视觉 + 语言 → 动作）`,
    robotApplication: 'Physical Intelligence 的 openpi（π0/π0.5）和 HEX（Open-X-Humanoid）采用流匹配。最新研究表明流匹配在人形操作任务上可以超越扩散策略。',
    relatedTerms: ['扩散策略', 'VLA', 'ODE求解器'],
    relatedProjectIds: ['openpi', 'hex-vla', 'rdt2'],
    formula: 'dx/dt = v_θ(x, t, c)    学习以视觉语言条件 c 为输入的速度场'
  },
  {
    id: 'glossary-asymmetric-ac',
    term: '非对称 Actor-Critic',
    englishName: 'Asymmetric Actor-Critic',
    path: ['强化学习算法'],
    difficulty: '进阶',
    definition: '仿真训练时 Critic 可以访问"特权信息"（如真实地面摩擦系数、物体精确位姿、外力大小），而 Actor 仅使用真实机器人传感器能获取的信息。让 Critic 给出更准确的价值评估，同时迫使 Actor 学习仅依赖可观测信息的鲁棒策略。',
    detail: `为什么需要非对称
真实机器人无法直接测量地面摩擦系数、精确接触力等物理量。但仿真中 Critic 可以使用这些信息来更准确地评估当前状态的好坏。Actor 训练和推理时看到的都是传感器能获取的信息，推理时不需要任何特权信息。

特权信息示例
地形信息：Critic 看到真实高度图，Actor 只看到关节角度和 IMU
接触信息：Critic 看到真实接触力，Actor 只看到足端力传感器读数
外力信息：Critic 看到外部推力向量，Actor 只看到 IMU 加速度变化
物体信息：Critic 看到被抓物体的精确位姿，Actor 只看到腕部相机图像

实现方式
在 Isaac Lab 中，ObservationManager 可分别定义 actor_obs 和 critic_obs。训练时 Critic 额外拼接特权信息，推理时仅用 actor_obs 部署。这是让机器人在不完美感知条件下保持鲁棒行走的关键技术。`,
    robotApplication: 'legged_gym、Isaac Lab 和 unitree_rl_gym 默认使用非对称 AC 训练。让机器人在不完美感知下保持鲁棒行走的关键。',
    relatedTerms: ['Actor-Critic', 'PPO', 'Sim2Real'],
    relatedProjectIds: ['isaac-lab', 'legged-gym', 'unitree-rl-gym'],
    formula: 'Actor(s_public) → action   |   Critic(s_public + s_priv) → value'
  },

  // ==================== 神经网络架构 ====================
  {
    id: 'glossary-mlp',
    term: 'MLP（多层感知机）',
    englishName: 'Multi-Layer Perceptron',
    path: ['神经网络架构'],
    difficulty: '入门',
    definition: '最基础的前馈神经网络：多层全连接神经元堆叠而成。在人形 RL 中，Actor 和 Critic 使用 2-4 层 MLP 作为骨干网络。对于简单步态和平衡控制，MLP 仍然是最佳性价比选择。',
    detail: `人形 RL 中的典型配置
Actor 网络：观测维度 → 256 → 128 → 64 → 动作维度
Critic 网络：观测维度 → 256 → 128 → 64 → 1（输出价值）
每层结构：Linear 全连接 → ELU 激活 → LayerNorm 归一化
输出层：Linear → Tanh 激活（将动作限制在 -1 到 1 之间）

MLP 的局限性
无法处理空间结构（如图像的像素排列）→ 需要 CNN 卷积网络
无法处理时序依赖（如关节角度的时间序列）→ 需要 LSTM 或 GRU
参数量随隐藏维度平方增长 → 大模型用 Transformer 或 MoE 替代

更先进的替代方案
Transformer：适合于多模态输入（视觉 + 状态 + 指令），VLA 模型的骨干
MoE 混合专家：大规模 VLA 模型（HoloMotion、LingBot-VLA）
CNN + MLP 混合：视觉编码用 CNN，策略网络用 MLP`,
    robotApplication: 'Isaac Lab、legged_gym、unitree_rl_gym 的默认 Actor/Critic 均使用 MLP。对于简单运动控制任务，2-3 层 MLP 仍然是最佳选择。',
    relatedTerms: ['ELU', 'ReLU', 'Transformer', 'CNN'],
    relatedProjectIds: ['isaac-lab', 'legged-gym', 'unitree-rl-gym'],
    formula: 'h_l = σ( W_l × h_{l-1} + b_l )    每层是一个线性变换 + 激活函数'
  },
  {
    id: 'glossary-transformer',
    term: 'Transformer（自注意力网络）',
    englishName: 'Transformer / Self-Attention',
    path: ['神经网络架构'],
    difficulty: '进阶',
    definition: '基于多头自注意力机制的神经网络架构，核心优势是能捕捉序列中任意两个位置之间的全局依赖关系。是所有现代 VLA 模型（GR00T、openpi、LingBot-VLA）的骨干网络。',
    detail: `四个核心组件
Self-Attention 自注意力：每个位置计算与所有其他位置的关联权重，然后加权聚合信息
Multi-Head 多头：并行运行多个注意力头，每个头捕捉不同类型的关系模式
Position Encoding 位置编码：注入位置信息，因为自注意力本身不感知顺序
Feed-Forward 前馈：在每个位置独立执行的 MLP 变换

在人形机器人中的三种用法
视觉编码器：用 ViT 将图像转为 token 序列（GR00T、HoloMotion）
多模态融合：将视觉、语言、状态 token 联合编码（LingBot-VLA、openpi）
动作解码器：用自回归或扩散方式生成动作序列（HEX VLA、Dexora）

计算复杂度
自注意力复杂度随序列长度平方增长，VLA 模型通常限制 token 在 256-1024 范围内来控制计算开销。`,
    robotApplication: '所有现代 VLA 模型（GR00T、openpi、LingBot-VLA、HoloMotion、HEX、Dexora）均使用 Transformer 或多模态 Transformer 变体作为骨干。',
    relatedTerms: ['MLP', 'VLA', '注意力机制', 'MoE'],
    relatedProjectIds: ['isaac-groot', 'openpi', 'hex-vla', 'holomotion', 'lingbot-vla'],
    formula: 'Attention(Q, K, V) = softmax( Q×K^T / √d ) × V    缩放点积注意力'
  },
  {
    id: 'glossary-moe',
    term: 'MoE（混合专家模型）',
    englishName: 'Mixture of Experts',
    path: ['神经网络架构'],
    difficulty: '深入',
    definition: '稀疏激活的神经网络架构——每次前向传播仅激活部分专家子网络（门控选择 Top-1 或 Top-2），从而在不增加计算量的前提下大幅扩大模型容量。HoloMotion 和 LingBot-World 2.0（14B 参数）的核心架构。',
    detail: `三个组成部分
门控网络 Router：输入 token，输出选择各专家的概率分布
专家网络 Experts：N 个独立的前馈子网络（通常 8-64 个）
稀疏激活：每个 token 仅路由到得分最高的 1-2 个专家

为什么用 MoE
参数规模 N 翻倍，计算量几乎不变（只激活 Top-k 个专家）。不同专家会自然分工——有的擅长处理平地步态，有的擅长上坡，有的擅长不平地形。
两个挑战：需要额外的负载均衡 Loss 防止所有 token 涌向同一个专家；所有专家权重需常驻 GPU 显存，对显存要求高。

在人形 VLA 中的应用
HoloMotion（地平线）：MoE Transformer 用于 Any Terrain 全身控制
LingBot-World 2.0（蚂蚁灵波）：14B MoE 参数的世界模型
UnifoLM-VLA（宇树）：不同专家处理导航、操作、交互等不同技能`,
    robotApplication: 'HoloMotion 使用 MoE Transformer 实现 Any Terrain 全身控制。LingBot-World 2.0 是目前最大的开源具身世界模型。',
    relatedTerms: ['Transformer', 'VLA', '世界模型', 'MLP'],
    relatedProjectIds: ['holomotion', 'lingbot-world'],
    formula: 'MoE(x) = Σ_{i 在 TopK 中} softmax(g_i) × Expert_i(x)    门控加权专家输出'
  },

  // ==================== 激活函数 ====================
  {
    id: 'glossary-activation',
    term: '激活函数全景',
    englishName: 'Activation Functions: ELU / ReLU / GELU / SiLU',
    path: ['激活函数'],
    difficulty: '入门',
    definition: '激活函数为神经网络引入非线性变换能力。在人形 RL 中，Actor 和 Critic 网络首选 ELU（负值平滑处理有利于连续控制）；Transformer VLA 模型则用 GELU 或 SiLU（在 NLP 和视觉任务中被充分验证）。',
    detail: `六种主流激活函数
ELU：正值线性，负值平滑衰减到负常数。零中心化，一阶导数连续。人形 RL 中 Actor 和 Critic 的最常用选择
ReLU：正值线性，负值直接截断为零。简单快速，但负值梯度为零会导致神经元永久失活
Leaky ReLU：正值线性，负值给一个很小斜率（0.01）。解决死神经元问题，偶尔用于 Critic
GELU：用高斯累积分布函数平滑门控。BERT 和 GPT 的标配，VLA Transformer 模型的主流选择
SiLU 即 Swish：用 Sigmoid 函数平滑门控。在 ViT 和扩散模型中表现更好，openpi (π0) 使用
Tanh：双曲正切，输出范围 -1 到 1。动作输出层的常用激活函数

为什么 RL 选 ELU
负值区域平滑（非零梯度），梯度流不中断
输出均值接近零（不像 ReLU 全是非负），有利于训练稳定
一阶导数连续，使策略梯度平滑，适合高维连续控制

为什么 VLA 选 GELU 或 SiLU
Transformer 架构的 VLA 模型（GR00T、openpi）延续了 NLP 领域的验证结论，GELU 和 SiLU 在大规模多模态训练中的稳定性和收敛速度优于 ELU。`,
    robotApplication: 'Isaac Lab 默认使用 ELU；legged_gym 的 Actor 和 Critic 均使用 ELU；NVIDIA GR00T 使用 GELU（Transformer 标配）；openpi (π0) 使用 SiLU。',
    relatedTerms: ['MLP', 'Actor-Critic', 'Transformer'],
    relatedProjectIds: ['isaac-lab', 'legged-gym', 'isaac-groot', 'openpi'],
    formula: 'ELU(x) = x (x>0) 或 α(e^x-1) (x≤0)    负值区域平滑指数衰减'
  },

  // ==================== 训练基础设施 ====================
  {
    id: 'glossary-gpu-parallel',
    term: 'GPU 并行化训练',
    englishName: 'GPU-Parallelized RL Training',
    path: ['训练基础设施'],
    difficulty: '入门',
    definition: '现代人形 RL 训练在 GPU 上同时运行数千到数万个并行仿真环境。每个环境是独立的物理世界实例，共享同一份神经网络权重。让原本需要数周的训练缩短到数小时甚至数十分钟。',
    detail: `并行化层级
Environment：单个仿真世界实例，通常 4096-32768 个并行
Agent：每个环境中的一个机器人实例
Step：一次物理步进，仿真时间 dt = 5ms（200Hz）
Episode：一次完整尝试，约 20 秒 = 4000 步
Iteration：收集 16-32 步数据后做一次策略更新

两大主流 GPU 训练平台

Isaac Lab（NVIDIA）
物理引擎：PhysX 5 GPU 加速
并行规模：支持 4096 个以上环境并行
特点：完整 RL/IL 工具链，原生集成 Isaac Sim 和 ROS2
硬件要求：推荐 RTX 4090 或 A100
G1 人形步态训练时间：约 2-4 小时

MuJoCo Playground（Google DeepMind）
物理引擎：MuJoCo MJX，基于 JAX GPU 加速
并行规模：支持 32768 个以上环境并行
特点：纯 Python/JAX 实现，单张消费级显卡数分钟完成步态训练
硬件要求：RTX 3090 或 4090 即可
G1 人形步态训练时间：约 15-30 分钟`,
    robotApplication: '所有开源人形项目（legged_gym、HumanoidVerse、unitree_rl_gym）均在此生态中。MJX 以极致速度著称；Isaac Lab 以完整工具链和工业级集成见长。',
    relatedTerms: ['PPO', 'Sim2Real', '域随机化'],
    relatedProjectIds: ['isaac-lab', 'mujoco-playground', 'legged-gym'],
    formula: '吞吐量 ≈ 并行环境数 × GPU单步速度 / 单环境仿真时间'
  },
  {
    id: 'glossary-wbc',
    term: 'WBC（全身控制）',
    englishName: 'Whole-Body Control',
    path: ['训练基础设施'],
    difficulty: '进阶',
    definition: '协调人形机器人所有关节（20-40+ 自由度）同时完成多个可能冲突任务的控制框架。通过分层优化将高层任务指令分解为各关节的力矩和位置指令。GR00T-WBC（NVIDIA）是目前最完善的开源实现。',
    detail: `核心问题
一台机器人同时要做四件事：保持站立不摔倒（高优先级）、右手去拿杯子（中优先级）、左手扶着桌子（高优先级）、头部看向说话的人（低优先级）。这些任务可能使用相同的关节（如腰部既负责平衡又负责转向），需要按优先级协调。

三种实现方式

优化型 WBC
将各任务建模为二次规划问题的约束或目标项。硬约束（如动力学一致性、关节限位）必须满足，软约束（如操作精度、姿态偏好）尽力优化。
代表：OCS2 + Pinocchio（ETH Zurich），学术界最常用的组合。

学习型 WBC
通过 RL 奖励函数隐式定义任务优先级，不需要手动设计优化问题。
代表：GR00T-WBC（NVIDIA）、GEAR-SONIC。

混合型 WBC
RL 策略输出高层目标，WBC 优化求解器负责底层执行。结合了学习的灵活性和优化的可靠性。
代表：ASAP（LeCAR-Lab）。

典型任务优先级
第一优先（硬约束）：动力学一致性、关节角度不超限、自己不打到自己
第二优先：保持质心稳定不摔倒
第三优先：脚踩准位置、手到达目标
第四优先：上半身姿态美观、头部看向目标`,
    robotApplication: 'GR00T-WBC（NVIDIA）是最完善的开源 WBC 框架。OCS2 + Pinocchio 是学术界最常用组合。AimRT（智元）提供工业级 WBC 中间件。',
    relatedTerms: ['MPC', 'OCS2', 'Pinocchio'],
    relatedProjectIds: ['groot-wbc', 'ocs2-pinocchio', 'aimrt'],
    formula: 'min ||Ax||²  s.t.  C_l ≤ Cx ≤ C_u    二次规划，A为目标，C为约束'
  },

  // ==================== VLA 基础模型 ====================
  {
    id: 'glossary-vla-model',
    term: 'VLA（视觉-语言-动作模型）',
    englishName: 'Vision-Language-Action Model',
    path: ['VLA 基础模型'],
    difficulty: '入门',
    definition: '具身智能的核心模型范式：输入视觉感知和语言指令，输出机器人动作。将计算机视觉和自然语言处理的预训练能力迁移到机器人控制，实现零样本或少样本的泛化能力。',
    detail: `三种实现范式

端到端（End-to-End）
图像 + 指令 → Transformer 或 DiT → 关节位置或力矩
优点：结构简洁、延迟低
缺点：可解释性差、黑箱
代表：openpi (π0)、GR00T N1

分层（Hierarchical / Dual-System）
高层（1-10Hz）：理解指令、规划子目标
低层（50-200Hz）：执行子目标、输出关节控制
优点：响应快、可解释
缺点：两层接口设计复杂
代表：GR00T N1.x（快慢双系统）、星海图 G0.5（Fast-WAM）

解耦（Decoupled）
视觉理解 → 中间表征 → 独立运动控制器
优点：模块化、各部分可分别优化
缺点：中间表征可能丢失信息
代表：π0.5、LingBot-VLA

输入模态
RGB 或深度图像（单目或双目）、自然语言指令或结构化指令、本体感受器（关节角度、力矩、IMU）、历史观测序列

动作表示
关节位置目标（最常用）、末端执行器位姿、力矩或电流指令（力控场景）、动作块（一次性输出未来多步动作）`,
    robotApplication: 'GR00T N1.7、openpi (π0/π0.5)、LingBot-VLA 2.0、Ψ0 (Psi-Zero)、HEX、HoloMotion、Dexora 均为 VLA 模型的不同实现，覆盖了端到端、分层、解耦三种范式。',
    relatedTerms: ['Transformer', '扩散策略', '流匹配', 'MoE'],
    relatedProjectIds: ['isaac-groot', 'openpi', 'lingbot-vla', 'psi-zero', 'hex-vla', 'holomotion', 'dexora'],
    formula: 'a_1:T = VLA( I_1:T, L, s_0 )    视觉序列 + 语言指令 + 初始状态 → 动作序列'
  },
  {
    id: 'glossary-teleoperation',
    term: '遥操作数据采集',
    englishName: 'Teleoperation Data Collection',
    path: ['VLA 基础模型'],
    difficulty: '进阶',
    definition: '收集人形机器人训练数据（特别是模仿学习和 VLA 微调数据）的核心方式。操作者通过 VR 头显、动捕服、主手机械臂或 RGB 相机控制机器人，系统同步录制观测-动作对作为训练轨迹。',
    detail: `六种主流遥操作方案（按硬件成本从高到低）
动捕服（XSens / Rokoko）：成本约 5000-20000 美元，精度极高覆盖全身。GEAR-SONIC 使用 700 小时动捕数据预训练
Apple Vision Pro：成本约 3500 美元，手部和头部跟踪精度高，延迟小于 50ms。Open-TeleVision 方案
主手机械臂：成本约 3000 美元，力反馈精度极高延迟小于 10ms。ALOHA 方案
VR 手柄（Meta Quest）：成本约 500 美元，6-DoF 跟踪精度中等延迟小于 30ms。OmniH2O 方案
Leader-Follower 同构遥操作：成本约 1000 美元，用小机器人控制大机器人。AgiBot X1 方案
RGB 相机：成本约 50 美元，2D 单目跟踪精度低。HumanPlus 方案

数据采集标准流程
1. 标定：对齐操作者与机器人的空间坐标系
2. 关节重定向：将操作者动作映射到机器人关节空间
3. 同步录制：保存 RGB 图像、关节状态、末端位姿（50-200Hz）
4. 后处理：去噪、时间对齐、质量筛选
5. 训练：用 ACT、Diffusion Policy 或 Flow Matching 训练策略

数据质量要求
轨迹长度 5-30 秒（太短缺上下文，太长难训练）
频率至少 100Hz（关节级控制需要高速率）
至少 2-3 个 RGB 视角
包含成功和失败案例以增加数据多样性`,
    robotApplication: '所有大规模真机数据集（AgiBot World、RoboMIND 400k 轨迹、Humanoid Everyday）均依赖遥操作采集。Stanford ALOHA 的低成本方案是目前社区最广泛使用的入门级遥操作方案。',
    relatedTerms: ['关节重定向', 'VLA', 'Diffusion Policy'],
    relatedProjectIds: ['open-television', 'aloha-mobile', 'agibot-world-ds', 'robomind-ds'],
    keyPapers: [
      { title: 'Open-TeleVision: Immersive Teleoperation with AVP', venue: 'CoRL 2024', year: '2024' },
      { title: 'Mobile ALOHA: Bimanual Mobile Manipulation', venue: 'arXiv', year: '2024' },
    ]
  },
];

// 构建树形结构
export function buildGlossaryTree(terms: GlossaryTerm[]): GlossaryTreeNode[] {
  const root: GlossaryTreeNode[] = [];

  for (const term of terms) {
    let current = root;
    for (let i = 0; i < term.path.length; i++) {
      const segment = term.path[i];
      let node = current.find((n) => n.name === segment);
      if (!node) {
        node = {
          name: segment,
          path: term.path.slice(0, i + 1),
          children: [],
          terms: [],
        };
        current.push(node);
      }
      current = node.children;
      if (i === term.path.length - 1) {
        node.terms.push(term);
      }
    }
  }

  return root;
}
