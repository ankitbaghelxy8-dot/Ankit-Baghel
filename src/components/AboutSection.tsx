import { useState, useRef, MouseEvent } from 'react';
import { BookOpen, Lightbulb, Cpu, Compass, Code2 } from 'lucide-react';

interface TiltCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  focusArea: string;
}

function TiltCard({ title, description, icon, accentColor, focusArea }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle rotation limits: max +/- 6 degrees
    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-4px)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
      className="relative p-6 rounded-2xl glass-card flex flex-col justify-between overflow-hidden group"
    >
      {/* Background glow flare */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity pointer-events-none ${accentColor}`}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
            {focusArea}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
        <span>Mindset Principle</span>
        <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">✦ Active</span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const cards = [
    {
      title: 'Continuous Learning',
      description:
        'Constantly expanding foundational knowledge in modern web stacks, programming patterns, and evolving computational paradigms.',
      icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
      accentColor: 'bg-cyan-500',
      focusArea: 'Growth',
    },
    {
      title: 'Creative Thinking',
      description:
        'Approaching design and development with curiosity, merging aesthetic precision, interactive 3D spatial flow, and intuitive UX.',
      icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
      accentColor: 'bg-amber-500',
      focusArea: 'Perspective',
    },
    {
      title: 'Technology & Innovation',
      description:
        'Investigating the potential of intelligent interfaces, real-time client systems, and modern digital tools that empower everyday users.',
      icon: <Cpu className="w-6 h-6 text-violet-400" />,
      accentColor: 'bg-violet-500',
      focusArea: 'Exploration',
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Core Identity</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          About Me
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Bio Narrative */}
        <div className="lg:col-span-5 p-8 rounded-3xl glass-panel flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              Building purposeful digital experiences with curiosity and intent.
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              I'm Ankit Baghel, an aspiring technology professional interested in web development,
              artificial intelligence, and creating useful digital products. I enjoy learning new
              technologies, experimenting with ideas, and developing solutions that make technology more
              accessible.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              My focus centers on combining clean interface design, responsive frontends, and
              interactive graphical elements to craft websites that are not just visual showcases,
              but smooth and dependable tools for users.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span>Location: Global / Remote</span>
            <span className="text-cyan-400 font-mono">Portfolio 2026</span>
          </div>
        </div>

        {/* Right Column: 3 Stylish 3D Tilt Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
          {cards.map((card) => (
            <TiltCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              accentColor={card.accentColor}
              focusArea={card.focusArea}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
