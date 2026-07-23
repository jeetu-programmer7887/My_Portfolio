import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

// Pre-renders the routes at build time for instant loading
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-void text-cream selection:bg-terminal/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/#work" 
          className="inline-flex items-center gap-2 text-cream/50 hover:text-terminal transition-colors my-8 uppercase tracking-widest text-xs font-mono"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-terminal" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-terminal">
              Case Study — {project.index}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-8 leading-none tracking-tighter text-cream">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-white/5 text-[10px] uppercase tracking-widest text-cream/70 border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 mb-20 bg-black/40 shadow-2xl backdrop-blur-sm">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top p-2 md:p-6"
            priority
          />
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-12 mb-20">
          
          {/* Left Column: System Architecture */}
          <div className="lg:col-span-1">
            <div className="sticky top-12">
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-terminal mb-6">
                System Architecture
              </h2>
              <p className="text-base md:text-lg text-cream/70 font-body leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>

          {/* Right Column: Challenges */}
          <div className="lg:col-span-2 space-y-12">
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-terminal mb-2 border-b border-white/10 pb-4">
              Technical Challenges & Solutions
            </h2>
            
            {project.challenges.map((challenge, idx) => (
              <div key={idx} className="group bg-white/[0.02] border border-white/5 p-6 md:p-8 hover:bg-white/[0.04] transition-colors">
                <h3 className="text-xl md:text-2xl font-display uppercase mb-4 text-cream group-hover:text-terminal transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-cream/60 leading-relaxed font-body text-base md:text-lg">
                  {challenge.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-12 border-t border-white/10">
          <a 
            href={project.live} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-10 py-5 bg-cream text-void font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-terminal transition-colors"
          >
            <ExternalLink size={14} /> View Live Project
          </a>
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-10 py-5 border border-cream/10 text-cream text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Source Code
          </a>
        </div>

      </div>
    </main>
  );
}