export type CategoryId =
  | 'overview'
  | 'timeline'
  | 'platforms'
  | 'frameworks'
  | 'simulators'
  | 'control'
  | 'vla'
  | 'datasets'
  | 'papers'
  | 'wizard'
  | 'urdf-pipeline'
  | 'guide'
  | 'glossary'
  | 'analytics';

export interface EcosystemItem {
  id: string;
  name: string;
  provider: string; // e.g. "NVIDIA", "智元机器人", "UC Berkeley"
  category: CategoryId;
  description: string;
  isOpenSource: boolean | 'partial' | string;
  openSourceDetails?: string;
  tags: string[];
  githubUrl?: string;
  paperUrl?: string;
  websiteUrl?: string;
  hfUrl?: string;
  releaseDate?: string; // e.g. "2026-05"
  license?: string;
  // Specific fields for Platforms
  cost?: string;
  trainStack?: string;
  simBackend?: string;
  deployStack?: string;
  hardwareOpenSource?: string;
  // Specific fields for VLA
  modelType?: string;
  keyFeatures?: string[];
  // Specific fields for Datasets
  scale?: string;
  contentDetails?: string;
  // Architecture & Deployment
  architecture?: string;
  deploymentMethod?: string;
  deploymentPipeline?: string;
  // 技术架构详解
  techArchitecture?: TechArchitecture;
  // Hardware Specs
  hardwareSpecs?: HardwareSpec;
  // Specific fields for Papers
  paperCategory?: 'Sim2Real' | 'WholeBodyControl' | 'VLA' | 'Survey';
  venue?: string;
  year?: string;
}

export interface TechArchitecture {
  overview: string;
  pipeline: string[];
  softwareStack: string[];
  rendering?: string;
  simulator?: string;
  system: string;
  architecturePattern: string;
  algorithms: string[];
}

export interface HardwareSpec {
  height?: string;
  weight?: string;
  dof?: number;
  motors?: MotorSpec[];
  computeModule?: string;
  imu?: string;
  materials?: string;
  communication?: string;
  powerSupply?: string;
  controllers?: string;
  manufacturingMethod?: string;
  coolingMethod?: string;
  layoutDescription?: string;
  wiringMethod?: string;
  cameraSetup?: { type: string; quantity: number; layout: string; resolution?: string };
  navigationMethod?: string;
  lidar?: string;
  sensorSuite?: string[];
  computeRef?: ComponentRef;
  imuRef?: ComponentRef;
  batteryRef?: ComponentRef;
  componentRefs?: ComponentRef[];
  officialResources?: { label: string; url: string }[];
}

export interface MotorSpec {
  location: string;
  type: string;
  model?: string;
  manufacturer?: string;
  manufacturerUrl?: string;
  torque?: string;
  speed?: string;
  controlMode?: string;
}

export interface ComponentRef {
  name: string;
  manufacturer: string;
  url?: string;
  note?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  englishName: string;
  path: string[]; // 树形路径 e.g. ['算法', '强化学习', 'PPO']
  difficulty: '入门' | '进阶' | '深入';
  definition: string;
  detail: string;
  robotApplication: string;
  relatedTerms: string[];
  relatedProjectIds: string[];
  keyPapers?: { title: string; venue: string; year: string; url?: string }[];
  formula?: string;
}

export interface GlossaryTreeNode {
  name: string;
  path: string[];
  children: GlossaryTreeNode[];
  terms: GlossaryTerm[];
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  institution: string;
  description: string;
  category: CategoryId;
  relatedItemId?: string;
  tags: string[];
}

export interface SelectorScenario {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  stackItems: string[]; // names of items in ecosystem
  benefits: string[];
  estimatedDifficulty: '入门级' | '中等' | '极高/科研';
}

export interface FilterState {
  searchQuery: string;
  categoryId: CategoryId;
  providerFilter: string;
  licenseFilter: string;
  openSourceOnly: boolean;
  sortBy: 'featured' | 'date' | 'name' | 'provider';
  selectedTags: string[];
}
