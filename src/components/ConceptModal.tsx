import { useState } from 'react';
import { X, ExternalLink, Code2, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../types';

interface ConceptModalProps {
  project: ProjectItem | null;
  mode: 'demo' | 'code' | null;
  onClose: () => void;
}

export default function ConceptModal({ project, mode, onClose }: ConceptModalProps) {
  if (!project) return null;

  // Interactive prototype states for demonstration
  const [interactiveInput, setInteractiveInput] = useState('');
  const [demoFeedback, setDemoFeedback] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('1080p (FHD)');

  const handleInteractiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interactiveInput.trim()) return;
    setDemoFeedback(`Concept simulated: "${interactiveInput}". Real-time processing pipeline will execute here upon API backend deployment.`);
    setInteractiveInput('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="relative w-full max-w-3xl my-8 rounded-2xl glass-panel border border-white/15 bg-[#090d18] shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 id="modal-title" className="text-lg font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded">
              Concept Exploration
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Close concept preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Hero Visual Preview */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video sm:aspect-[16/9] bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-mono text-[11px]">
                Concept UI Showcase
              </span>
              <span className="bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 px-2.5 py-1 rounded-md text-[11px]">
                Design Prototype
              </span>
            </div>
          </div>

          {/* Description & Status Notice */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-white">Project Overview</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed italic bg-slate-900/60 p-3 rounded-lg border border-white/[0.06]">
              <strong className="text-indigo-300 not-italic">Developer Note:</strong> This is a conceptual
              prototype designed by Ankit Baghel to demonstrate interface architecture, user interaction
              flows, and aesthetic direction. Real backend infrastructure and GitHub repositories will be
              linked as production implementation concludes.
            </p>
          </div>

          {/* Technology Tags */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Technology Stack Focus
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/[0.05] border border-white/10 text-cyan-300 px-2.5 py-1 rounded-md font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Concept Features */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Key Architectural Goals
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-white/[0.05]">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Prototype Simulation Area */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Interactive Concept Simulation</span>
            </div>

            {project.id === 'ai-assistant' && (
              <form onSubmit={handleInteractiveSubmit} className="space-y-2">
                <p className="text-xs text-slate-400">
                  Try typing a sample prompt into the conversational concept bar:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={interactiveInput}
                    onChange={(e) => setInteractiveInput(e.target.value)}
                    placeholder="e.g., Analyze the quantum array optimization..."
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Test</span>
                  </button>
                </div>
              </form>
            )}

            {project.id === 'video-downloader' && (
              <div className="space-y-2 text-xs">
                <p className="text-slate-400">Select target resolution preset for previewing utility state:</p>
                <div className="flex flex-wrap gap-2">
                  {['4K (2160p)', '1440p (QHD)', '1080p (FHD)', '720p (HD)'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => {
                        setSelectedFormat(fmt);
                        setDemoFeedback(`Selected target preset: ${fmt}. Stream muxing parameter configured.`);
                      }}
                      className={`px-3 py-1.5 rounded-md border text-xs transition-colors ${
                        selectedFormat === fmt
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                          : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {project.id === 'food-scanner' && (
              <div className="space-y-2 text-xs">
                <p className="text-slate-400">Simulate nutritional ingredient query:</p>
                <button
                  type="button"
                  onClick={() =>
                    setDemoFeedback('Label recognized: Organic Quinoa & Kale Blend (Score: 94/100). Macros: 32% Protein, 56% Carbs, 12% Healthy Fats.')
                  }
                  className="px-3 py-1.5 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/40 text-cyan-200 rounded-lg text-xs font-medium"
                >
                  Simulate QR / Barcode Scan
                </button>
              </div>
            )}

            {demoFeedback && (
              <div className="text-xs text-cyan-300 bg-cyan-950/50 p-2.5 rounded-md border border-cyan-800/40 animate-fade-in">
                {demoFeedback}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-slate-900/60">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            {mode === 'code' ? (
              <>
                <Code2 className="w-4 h-4 text-violet-400" />
                <span>Source repository placeholder (pending release)</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                <span>Concept interface preview active</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:ab40510245@gmail.com?subject=${encodeURIComponent(
                `Regarding ${project.title} concept`
              )}`}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
            >
              Discuss with Ankit
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
