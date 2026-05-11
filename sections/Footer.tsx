export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-void px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="font-mono text-sm tracking-wider text-cream/60">
          jeetu.dev
          <span className="ml-1 inline-block h-4 w-2 animate-blink bg-terminal align-middle" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
          {["Work", "Skills", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link text-cream/40 hover:text-cream">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {[
            { code: "GH", href: "https://github.com/jeetu-programmer7887",   label: "GitHub" },
            { code: "LI", href: "https://www.linkedin.com/in/jeetu-prasad", label: "LinkedIn" },
            { code: "TH", href: "https://www.threads.com/@jeetu_prasad143",   label: "Threads" },
          ].map((social) => (
            <a
              key={social.code}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 font-mono text-[10px] text-cream/40 transition-all duration-300 hover:border-terminal/50 hover:text-terminal"
              aria-label={social.label}
            >
              {social.code}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 pt-8 text-center">
        <p className="font-mono text-[10px] tracking-wider text-mouse-gray">
          {`// designed & built by jeetu prasad - 2026 - all systems operational`}          
        </p>
      </div>
    </footer>
  );
}
