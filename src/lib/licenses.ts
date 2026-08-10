export interface LicenseProfile {
  allows: string[];
  restrictions: string[];
}

// 许可速览映射：按 SPDX 通用条款归纳，按优先级匹配（先特殊后通用）
const LICENSE_PROFILES: { match: RegExp; allows: string[]; restrictions: string[] }[] = [
  { match: /未提供|无许可/, allows: ['浏览 / 评估代码'], restrictions: ['禁止商用', '禁止再分发', '使用前需联系作者授权'] },
  { match: /proprietary/i, allows: ['评估使用'], restrictions: ['禁止商用', '禁止修改', '禁止再分发', '需官方授权'] },
  { match: /cc by-nc-sa/i, allows: ['自由分享', '自由修改'], restrictions: ['禁止商用', '必须署名', '衍生作品须相同方式共享'] },
  { match: /cc by-nc/i, allows: ['自由分享', '自由修改'], restrictions: ['禁止商用', '必须署名'] },
  { match: /cc by/i, allows: ['商用', '自由分享', '自由修改'], restrictions: ['必须署名'] },
  { match: /gpl-?3|gplv3/i, allows: ['商用', '修改', '再分发'], restrictions: ['衍生作品必须 GPL-3.0 开源', '需提供源码'] },
  { match: /gpl-?2|gplv2/i, allows: ['商用', '修改', '再分发'], restrictions: ['衍生作品必须 GPL-2.0 开源', '需提供源码'] },
  { match: /apache/i, allows: ['商用', '修改', '再分发', '专利授权'], restrictions: ['保留版权与许可声明', '无担保'] },
  { match: /mit/i, allows: ['商用', '修改', '再分发', '再授权'], restrictions: ['保留版权声明', '无担保'] },
  { match: /bsd/i, allows: ['商用', '修改', '再分发'], restrictions: ['保留版权声明', '不得用官方名称背书'] },
  { match: /openmdw/i, allows: ['商用', '修改', '再分发'], restrictions: ['保留版权与许可声明'] },
  { match: /openatom/i, allows: ['商用', '修改', '再分发'], restrictions: ['保留声明', '遵守 OpenAtom 条款'] },
  { match: /eula|open model license|omniverse license/i, allows: ['个人 / 研究使用'], restrictions: ['商用需授权', '须遵守 NVIDIA 条款'] },
];

export function getLicenseProfile(license?: string): LicenseProfile | null {
  if (!license) return null;
  for (const p of LICENSE_PROFILES) {
    if (p.match.test(license)) return p;
  }
  return { allows: ['按项目声明使用'], restrictions: ['需阅读项目官方条款'] };
}
