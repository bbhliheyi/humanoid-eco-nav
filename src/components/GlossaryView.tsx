import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS, buildGlossaryTree } from '../data/glossaryData';
import { EcosystemItem, GlossaryTreeNode } from '../types';
import {
  BookOpen, Search, ChevronDown, ChevronRight, ExternalLink, Zap, Cpu, Brain,
} from 'lucide-react';

interface GlossaryViewProps {
  allItemMap: Record<string, EcosystemItem>;
  onSelectProject: (item: EcosystemItem) => void;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  '入门': 'bg-green-100 text-green-700 border-green-300',
  '进阶': 'bg-amber-100 text-amber-700 border-amber-300',
  '深入': 'bg-red-100 text-red-700 border-red-300',
};

const PATH_ICONS: Record<string, React.FC<{ className?: string }>> = {
  '机械结构与建模': Cpu,
  '嵌入式硬件系统': Cpu,
  '嵌入式软件': Zap,
  '仿真与物理引擎': Zap,
  '强化学习算法': Brain,
  '神经网络架构': Brain,
  '激活函数': Brain,
  '训练基础设施': Zap,
  'VLA 基础模型': Brain,
};

export const GlossaryView: React.FC<GlossaryViewProps> = ({ allItemMap, onSelectProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => new Set(GLOSSARY_TERMS.map((t) => t.path[0])));
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const tree = useMemo(() => buildGlossaryTree(GLOSSARY_TERMS), []);

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return GLOSSARY_TERMS;
    const q = searchQuery.toLowerCase();
    return GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.englishName.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.path.some((p) => p.toLowerCase().includes(q)) ||
        t.relatedTerms.some((r) => r.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const togglePath = (pathKey: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(pathKey)) next.delete(pathKey);
      else next.add(pathKey);
      return next;
    });
  };

  const toggleTerm = (id: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Recursive tree node renderer
  const renderTreeNode = (node: GlossaryTreeNode, depth: number) => {
    const pathKey = node.path.join('/');
    const isExpanded = expandedPaths.has(pathKey);
    const PathIcon = PATH_ICONS[node.name] || BookOpen;
    const hasChildren = node.children.length > 0;
    const hasTerms = node.terms.length > 0;
    const childTerms = searchQuery ? node.terms.filter((t) => filteredTerms.includes(t)) : node.terms;
    const visibleChildren = node.children.filter(
      (c) => !searchQuery || c.terms.some((t) => filteredTerms.includes(t)) || c.children.length > 0
    );

    return (
      <div key={pathKey}>
        {/* Node Header */}
        {(hasChildren || hasTerms) && (
          <button
            onClick={() => togglePath(pathKey)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors cursor-pointer rounded-lg ${
              isExpanded ? 'bg-[#EFECE6]' : 'hover:bg-[#FAF8F5]'
            }`}
            style={{ paddingLeft: `${12 + depth * 20}px` }}
          >
            <span className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
              <ChevronRight className="w-4 h-4 text-[#8C867E]" />
            </span>
            <PathIcon className="w-4 h-4 text-[#B83232]" />
            <span className="text-sm font-bold text-[#2D2A26]">{node.name}</span>
            <span className="text-xs text-[#8C867E] font-mono ml-auto">
              {node.terms.length + node.children.reduce((s, c) => s + c.terms.length, 0)} 项
            </span>
          </button>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <div>
            {/* Child Nodes */}
            {visibleChildren.map((child) => renderTreeNode(child, depth + 1))}

            {/* Terms at this level */}
            {childTerms.map((term) => {
              const isExpandedTerm = expandedTerms.has(term.id);
              const relatedProjects = term.relatedProjectIds
                .map((id) => allItemMap[id])
                .filter(Boolean);

              return (
                <div
                  key={term.id}
                  className="border-b border-[#D8D3CA]/50 last:border-b-0"
                  style={{ paddingLeft: `${12 + (depth + 1) * 20}px` }}
                >
                  {/* Term Header */}
                  <button
                    onClick={() => toggleTerm(term.id)}
                    className="w-full flex items-center gap-2.5 py-2.5 pr-3 text-left hover:bg-[#FAF8F5] transition-colors cursor-pointer rounded-lg"
                  >
                    <span className={`transition-transform ${isExpandedTerm ? 'rotate-90' : ''}`}>
                      <ChevronRight className="w-3.5 h-3.5 text-[#B83232]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#2D2A26]">{term.term}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold shrink-0 ${DIFFICULTY_COLORS[term.difficulty]}`}>
                          {term.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-[#524D46] mt-0.5 line-clamp-1">{term.definition}</p>
                    </div>
                  </button>

                  {/* Term Detail */}
                  {isExpandedTerm && (
                    <div className="pr-3 pb-4 pl-8 space-y-3">
                      {/* Definition */}
                      <div className="bg-[#FAF8F5] border border-[#D8D3CA] rounded-lg p-3 text-xs text-[#2D2A26] leading-relaxed whitespace-pre-line">
                        {term.detail}
                      </div>

                      {/* Formula */}
                      {term.formula && (
                        <div className="bg-[#2D2A26] text-[#FAF8F5] text-xs font-mono p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                          {term.formula}
                        </div>
                      )}

                      {/* Application */}
                      <div>
                        <h4 className="text-[10px] font-bold text-[#B83232] uppercase mb-1">在机器人中的应用</h4>
                        <p className="text-xs text-[#524D46] bg-[#FFFFFF] border border-[#D8D3CA] rounded-lg p-3">
                          {term.robotApplication}
                        </p>
                      </div>

                      {/* Related Terms */}
                      {term.relatedTerms.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {term.relatedTerms.map((rt) => (
                            <span key={rt} className="text-[10px] px-2 py-0.5 bg-[#FFFFFF] border border-[#D8D3CA] rounded font-medium text-[#524D46]">
                              {rt}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Key Papers */}
                      {term.keyPapers && term.keyPapers.length > 0 && (
                        <div className="space-y-1">
                          <h4 className="text-[10px] font-bold text-[#B83232] uppercase">核心论文</h4>
                          {term.keyPapers.map((paper, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-[#FFFFFF] border border-[#D8D3CA] rounded-lg px-3 py-1.5 text-xs">
                              <span className="text-[#B83232] font-mono font-bold text-[10px]">[{idx + 1}]</span>
                              <span className="flex-1">{paper.title}</span>
                              <span className="text-[10px] text-[#8C867E] font-mono">{paper.venue} ({paper.year})</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Related Projects */}
                      {relatedProjects.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {relatedProjects.map((proj) => (
                            <button
                              key={proj.id}
                              onClick={() => onSelectProject(proj)}
                              className="flex items-center gap-1 px-2 py-1 bg-[#2D2A26] hover:bg-[#B83232] text-white text-[10px] rounded-lg font-semibold transition-colors cursor-pointer"
                            >
                              {proj.name}
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#FFFFFF] border border-[#D8D3CA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-[#2D2A26] text-white rounded-lg">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B83232] bg-[#FAF8F5] border border-[#D8D3CA] px-2.5 py-0.5 rounded">
            知识体系 · 从总到分
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-editorial-serif text-[#1A1816] mb-2">
          技术百科 <span className="italic text-[#B83232]">总分架构</span>
        </h1>
        <p className="text-sm text-[#524D46] max-w-3xl">
          按<strong className="text-[#B83232]">机械结构 → 嵌入式硬件 → 嵌入式软件 → 仿真 → 强化学习算法 → 神经网络 → VLA 基础模型</strong>的树形知识体系组织。
          展开节点查看详细原理、公式、论文与关联开源项目。
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-[#FFFFFF] border border-[#D8D3CA] rounded-xl px-4 py-3">
        <Search className="w-4 h-4 text-[#8C867E] shrink-0" />
        <input
          type="text"
          placeholder="搜索术语... (PPO, ELU, Sim2Real, 电机, EtherCAT...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 text-sm bg-transparent focus:outline-none"
        />
        {searchQuery && (
          <span className="text-xs text-[#8C867E] font-mono">{filteredTerms.length} 项匹配</span>
        )}
      </div>

      {/* Tree View */}
      <div className="bg-[#FFFFFF] border border-[#D8D3CA] rounded-xl overflow-hidden divide-y divide-[#D8D3CA]/50">
        {tree.map((node) => renderTreeNode(node, 0))}
      </div>
    </div>
  );
};
