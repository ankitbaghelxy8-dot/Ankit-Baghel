import { ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#05070b]/90 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Slogan */}
        <div className="flex flex-col items-center md:items-start space-y-1.5 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              AB
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">
              Ankit Baghel
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Designed with curiosity and built for the future.
          </p>
        </div>

        {/* Center: Direct Email Link */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <a
            href="mailto:ab40510245@gmail.com"
            className="hover:text-cyan-300 transition-colors underline-offset-4 hover:underline"
          >
            ab40510245@gmail.com
          </a>
        </div>

        {/* Right: Copyright & Back-to-Top Button */}
        <div className="flex items-center gap-5 text-xs text-slate-400">
          <span>&copy; {currentYear} Ankit Baghel.</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3 text-cyan-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
