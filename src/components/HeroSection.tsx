import { ArrowDown, Sparkles, FolderGit2, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function HeroSection() {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full z-10 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start space-y-6">
          
          {/* Introductory Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3.5 py-1.5 rounded-full backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>HELLO, I'M</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] glow-text"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Ankit
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Baghel
            </span>
          </motion.h1>

          {/* Professional Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl font-medium text-indigo-300 max-w-xl"
          >
            Creative Digital Explorer | Future IT Professional
          </motion.p>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl"
          >
            Exploring technology, building digital experiences, and turning ideas into reality.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollTo('#projects')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 rounded-xl hover:opacity-95 transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-cyan-500/25 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group"
            >
              <FolderGit2 className="w-4 h-4 text-cyan-200 transition-transform group-hover:scale-110" />
              <span>Explore My Work</span>
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-indigo-400/40 rounded-xl transition-all duration-200 backdrop-blur-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span>Contact Me</span>
            </button>
          </motion.div>

          {/* Quick Info Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-4 flex items-center gap-3 text-xs text-slate-400"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Passionate about modern web development &amp; AI concepts</span>
          </motion.div>
        </div>

        {/* Right Column: 3D Scene Viewport complement */}
        <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center">
          <div className="w-full max-w-sm p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md shadow-2xl relative">
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-indigo-600/80 border border-indigo-400/30 text-[11px] font-medium text-indigo-100 rounded-full backdrop-blur-sm">
              Interactive 3D Space
            </div>
            <div className="text-xs text-slate-400 space-y-2">
              <p className="font-semibold text-slate-200">Realtime Three.js Visualizer</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Hover or touch across the screen to interact with the responsive 3D geometric cluster and floating crystal meshes.
              </p>
              <div className="flex items-center gap-2 pt-2 text-[10px] text-cyan-400 font-mono">
                <span>WebGL2</span>
                <span>·</span>
                <span>PBR Materials</span>
                <span>·</span>
                <span>Parallax Damping</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={() => scrollTo('#about')}
          className="flex flex-col items-center gap-1 text-[11px] tracking-widest uppercase text-slate-400 hover:text-cyan-300 focus:outline-none"
          aria-label="Scroll to About Me section"
        >
          <span>Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </button>
      </div>
    </section>
  );
}
