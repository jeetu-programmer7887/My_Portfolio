"use client";

import { FormEvent, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/utils";

const contactDetails = [
  { icon: "MAIL", text: "prasadjeetu760@email.com", href: "mailto:prasadjeetu760@email.com" },
  { icon: "IN",   text: "linkedin.com/in/jeetuprasad", href: "https://www.linkedin.com/in/jeetu-prasad" },
  { icon: "GH",   text: "github.com/jeetu-programmer7887", href: "https://github.com/jeetu-programmer7887" },
  { icon: "REM",  text: "Available for remote worldwide", href: null },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({ name: "", email: "", brief: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Message staged. Wire this form to your email or API endpoint.");
  };

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen overflow-hidden py-32">
      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="mx-auto grid min-h-[60vh] max-w-7xl items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: easeOutExpo }}
            className="glass-strong rounded-lg p-8 md:p-12"
          >
            <h2 className="font-serif text-3xl italic text-cream md:text-4xl">
              Have something worth building?
            </h2>
            <p className="font-body mb-10 mt-2 text-xs uppercase tracking-widest-xl text-mouse-gray">
              Get In Touch
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="font-body w-full border-b border-white/10 bg-transparent py-3 text-cream placeholder:text-mouse-gray focus:border-terminal focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="font-body w-full border-b border-white/10 bg-transparent py-3 text-cream placeholder:text-mouse-gray focus:border-terminal focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <textarea
                  placeholder="Project Brief"
                  rows={4}
                  value={formState.brief}
                  onChange={(e) => setFormState({ ...formState, brief: e.target.value })}
                  className="font-body w-full resize-none border-b border-white/10 bg-transparent py-3 text-cream placeholder:text-mouse-gray focus:border-terminal focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-cream py-4 font-mono text-sm tracking-wider text-void transition-colors duration-500 hover:bg-terminal"
              >
                Send
                <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
              </button>

              {status && <p className="font-mono text-xs text-terminal/80">{status}</p>}
            </form>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.2, ease: easeOutExpo }}
            className="space-y-4"
          >
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.text}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.4 + index * 0.1, ease: easeOutExpo }}
              >
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="glass inline-flex max-w-full items-center gap-3 rounded-full border border-white/[0.08] px-6 py-3 transition-all duration-500 hover:-translate-y-1 hover:border-terminal/30"
                  >
                    <span className="shrink-0 font-mono text-[10px] text-terminal/80">{detail.icon}</span>
                    <span className="font-body break-all text-sm text-cream/80">{detail.text}</span>
                  </a>
                ) : (
                  <div className="glass inline-flex max-w-full items-center gap-3 rounded-full border border-white/[0.08] px-6 py-3">
                    <span className="shrink-0 font-mono text-[10px] text-terminal/80">{detail.icon}</span>
                    <span className="font-body text-sm text-cream/80">{detail.text}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
