import { useState } from 'react';
import { ExternalLink, Code2, Sparkles, FolderGit2 } from 'lucide-react';
import type { ProjectItem } from '../types';
import ConceptModal from './ConceptModal';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'ai-assistant',
    title: 'AI Assistant Website',
    subtitle: 'Conversational Intelligence Concept',
    description: 'A concept for an AI-powered assistant with a clean conversational interface.',
    image: '/src/assets/images/project_ai_assistant_1793033265548.jpg',
    tags: ['React', 'TypeScript', 'Conversational UI', 'Web Audio API', 'Tailwind CSS'],
    type: 'Concept Prototype',
    features: [
      'Interactive voice waveform audio state visualizer',
      'Glassmorphic dark interface with electric cyan and purple glows',
      'Markdown rendering & code block syntax display',
      'Session memory & context history management architecture'
    ],
    conceptRationale: 'Explores frictionless conversational ergonomics and human-AI interface interaction patterns.'
  },
  {
    id: 'video-downloader',
    title: 'Video Downloader Interface',
    subtitle: 'Media Utility & Transcoding Concept',
    description: 'A responsive video utility interface with quality-selection concepts.',
    image: '/src/assets/images/project_video_downloader_1793033266043.jpg',
    tags: ['Responsive Web Design', 'JavaScript', 'Media Streams', 'Utility UI', 'CSS Grid'],
    type: 'Concept Prototype',
    features: [
      'Multi-resolution preset selection (4K UHD to 720p)',
      'Real-time bitrate & bandwidth performance charts',
      'Custom media player viewport with dark ambient backdrop',
      'Batch download queue concept & format transcode selector'
    ],
    conceptRationale: 'Designed to solve complex media utility controls through accessible, high-performance UI composition.'
  },
  {
    id: 'food-scanner',
    title: 'Smart Food Label Scanner',
    subtitle: 'Computer Vision & Nutrition UI Concept',
    description: 'A concept for scanning food labels and presenting ingredient information.',
    image: '/src/assets/images/project_food_scanner_1793033266333.jpg',
    tags: ['Mobile UX', 'Computer Vision Concept', 'Health Tech', 'Data Visualization', 'React'],
    type: 'Concept Prototype',
    features: [
      'Holographic overlay HUD for packaging barcode recognition',
      'Nutritional macro breakdowns (Protein, Carbs, Healthy Fats)',
      'Allergen alert flagging and clean ingredient parsing',
      'Mobile-optimized touch layout and high-contrast typography'
    ],
    conceptRationale: 'Bridges nutrition science and consumer packaging through instant visual breakdown analysis.'
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalMode, setModalMode] = useState<'demo' | 'code' | null>(null);

  const openModal = (project: ProjectItem, mode: 'demo' | 'code') => {
    setSelectedProject(project);
    setModalMode(mode);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalMode(null);
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Exploratory Works &amp; Prototypes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Featured Projects
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-4 leading-relaxed">
          Interactive concepts and design prototypes demonstrating my exploration in user interface
          design, modern web standards, and digital product architecture.
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl glass-card overflow-hidden flex flex-col justify-between border border-white/10 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Visual Thumbnail Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent opacity-80" />
              
              {/* Concept Label */}
              <div className="absolute top-3.5 left-3.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-md">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Concept Prototype</span>
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technology Tags (Clean unboxed tags) */}
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  {project.tags.map((tag, idx) => (
                    <span key={tag} className="flex items-center">
                      <span className="text-slate-300 font-mono text-[11px] hover:text-indigo-300 transition-colors">
                        {tag}
                      </span>
                      {idx < project.tags.length - 1 && (
                        <span className="text-slate-600 mx-1.5" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Actions: Live Demo & Source Code */}
            <div className="p-6 pt-0 border-t border-white/[0.06] mt-auto">
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => openModal(project, 'demo')}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 rounded-xl transition-all duration-200 border border-indigo-400/30 hover:shadow-md hover:shadow-indigo-500/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Live Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => openModal(project, 'code')}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 hover:text-white rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Code2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Source Code</span>
                </button>
              </div>

              <div className="mt-3 text-center text-[11px] text-slate-400">
                <span>Click to inspect concept architecture &amp; mockup</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Concept Disclaimer Strip */}
      <div className="mt-14 p-4 rounded-xl bg-slate-900/50 border border-white/[0.07] text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="text-cyan-400 font-semibold">Note on Projects:</span>
        <span>
          These featured cards represent design and functional prototypes. Production links and public
          repositories will be populated as full deployment cycles complete.
        </span>
      </div>

      {/* Modal View */}
      {selectedProject && (
        <ConceptModal
          project={selectedProject}
          mode={modalMode}
          onClose={closeModal}
        />
      )}

    </section>
  );
}
