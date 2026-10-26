import { useState } from 'react';
import {
  FileCode,
  Terminal,
  Atom,
  Binary,
  Layout,
  Brain,
  Palette,
  GitBranch,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import type { SkillItem } from '../types';

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'html-css',
    name: 'HTML & CSS',
    category: 'core',
    categoryLabel: 'Core Foundations',
    description: 'Semantic markup structure, modern CSS flexbox/grid layout systems, responsive variables, and transitions.',
    iconName: 'FileCode',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'core',
    categoryLabel: 'Scripting & Logic',
    description: 'ES6+ syntax, asynchronous programming, DOM event architecture, and functional programming concepts.',
    iconName: 'Terminal',
  },
  {
    id: 'react',
    name: 'React',
    category: 'frameworks',
    categoryLabel: 'Frontend Architecture',
    description: 'Component lifecycles, custom hooks, reactive state flows, modular component composition, and virtual DOM.',
    iconName: 'Atom',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'frameworks',
    categoryLabel: 'Backend & Scripting',
    description: 'General-purpose programming, automation scripts, data handling, and exploring computational backends.',
    iconName: 'Binary',
  },
  {
    id: 'responsive-design',
    name: 'Responsive Web Design',
    category: 'design',
    categoryLabel: 'Cross-Device UX',
    description: 'Mobile-first viewport composition, fluid typography, touch ergonomics, and media query discipline.',
    iconName: 'Layout',
  },
  {
    id: 'ai-concepts',
    name: 'Artificial Intelligence',
    category: 'frameworks',
    categoryLabel: 'Emerging Tech',
    description: 'Understanding LLM concepts, multimodal AI interfaces, prompt engineering, and intelligent app design.',
    iconName: 'Brain',
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    category: 'design',
    categoryLabel: 'Interface Craft',
    description: 'Information hierarchy, glassmorphism aesthetics, color contrast compliance, and user-centered design patterns.',
    iconName: 'Palette',
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'tools',
    categoryLabel: 'Version Control',
    description: 'Branch management, commit hygiene, collaborative code sharing, repositories, and GitHub workflow.',
    iconName: 'GitBranch',
  },
];

const renderSkillIcon = (iconName: string) => {
  switch (iconName) {
    case 'FileCode':
      return <FileCode className="w-6 h-6 text-orange-400" />;
    case 'Terminal':
      return <Terminal className="w-6 h-6 text-yellow-400" />;
    case 'Atom':
      return <Atom className="w-6 h-6 text-cyan-400" />;
    case 'Binary':
      return <Binary className="w-6 h-6 text-emerald-400" />;
    case 'Layout':
      return <Layout className="w-6 h-6 text-sky-400" />;
    case 'Brain':
      return <Brain className="w-6 h-6 text-purple-400" />;
    case 'Palette':
      return <Palette className="w-6 h-6 text-pink-400" />;
    case 'GitBranch':
      return <GitBranch className="w-6 h-6 text-red-400" />;
    default:
      return <Layers className="w-6 h-6 text-indigo-400" />;
  }
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Learning Interests' },
    { id: 'core', label: 'Core Foundations' },
    { id: 'frameworks', label: 'Frameworks & Logic' },
    { id: 'design', label: 'Design & UX' },
    { id: 'tools', label: 'Tools & Versioning' },
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Technical Growth &amp; Exploration</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Skills &amp; Learning Interests
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-4 leading-relaxed">
          Technologies and domains I actively study, experiment with, and cultivate as an aspiring IT
          professional.
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/[0.06]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="group relative p-6 rounded-2xl glass-card flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderSkillIcon(skill.iconName)}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.05]">
                  {skill.categoryLabel}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2">
                {skill.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Bottom Status (Unboxed clean metadata, no fake percentages) */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Learning Interest</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Footnote on Skill Philosophy */}
      <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        <span>Focused on building robust fundamentals and creating hands-on projects.</span>
      </div>

    </section>
  );
}
