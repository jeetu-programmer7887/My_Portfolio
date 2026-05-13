"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import { easeOutExpo } from "@/lib/utils";

const contactDetails = [
  {
    icon: "MAIL",
    text: "prasadjeetu760@gmail.com",
    href: "mailto:prasadjeetu760@gmail.com",
  },
  {
    icon: "IN",
    text: "linkedin.com/in/jeetu-prasad",
    href: "https://www.linkedin.com/in/jeetu-prasad",
  },
  {
    icon: "GH",
    text: "github.com/jeetu-programmer7887",
    href: "https://github.com/jeetu-programmer7887",
  },
  {
    icon: "REM",
    text: "Available for remote worldwide",
    href: null,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.15,
  });

  // Initialize React Hook Form
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Initialize Web3Forms Hook
  const { submit: onSubmit } = useWeb3Forms({
    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    settings: {
      from_name: "Contact Form",
      subject: "New Message from Portfolio",
    },
    onSuccess: (msg) => {
      setIsSubmitting(false);
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    },
    onError: (msg) => {
      setIsSubmitting(false);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    },
  });

  // Wrapper to handle the loading state
  const handleFormSubmit = (data: any) => {
    setIsSubmitting(true);
    onSubmit(data);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen overflow-hidden py-8">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-terminal/5 blur-[140px]" />
        <div className="absolute -left-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-terminal/3 blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-7xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: easeOutExpo }}
            className="flex items-center gap-4 md:gap-6"
          >
            <div className="hairline flex-1" />
            <h2 className="whitespace-nowrap font-display text-4xl uppercase tracking-tight text-cream sm:text-5xl md:text-7xl">
              Contact
            </h2>
            <div className="hairline flex-1" />
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* FORM SIDE */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.1, ease: easeOutExpo }}
            whileHover={{ scale: 1.015 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-xl md:p-8"
          >
            <div className="relative z-10">
              <div className="mb-7 border-b border-white/[0.06] pb-6">
                <h3 className="font-display text-3xl uppercase leading-tight text-cream md:text-4xl">
                  Have something <br />
                  <span className="text-terminal">worth building?</span>
                </h3>
                <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-cream/50">
                  Drop a message and I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
                <div className="group relative">
                  <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40 group-focus-within:text-terminal">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    {...register("name", { required: true })}
                    className="font-body w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-cream outline-none transition-all placeholder:text-cream/25 focus:border-terminal/60 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="group relative">
                  <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40 group-focus-within:text-terminal">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", { required: true })}
                    className="font-body w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-cream outline-none transition-all placeholder:text-cream/25 focus:border-terminal/60 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="group relative">
                  <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40 group-focus-within:text-terminal">
                    Project Brief
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project..."
                    {...register("message", { required: true })}
                    className="font-body min-h-[120px] w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-cream outline-none transition-all placeholder:text-cream/25 focus:border-terminal/60 focus:bg-white/[0.05]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-2xl border border-terminal/30 bg-terminal/10 py-4 font-mono text-sm uppercase tracking-[0.2em] text-terminal transition-all duration-500 hover:-translate-y-1 hover:border-terminal disabled:opacity-50"
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                    {isSubmitting ? "Sending..." : "Send Message →"}
                  </span>
                  <div className="absolute inset-0 bg-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </button>

                {status === "success" && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs text-terminal">
                    ✓ Message sent. I&apos;ll be in touch soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs text-red-400">
                    ✕ Submission failed. Please try again.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>

          {/* INFO SIDE */}
          <div className="flex h-full flex-col justify-center space-y-5 py-4">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="inline-flex items-center gap-3 rounded-full border border-terminal/20 bg-terminal/10 px-6 py-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-terminal">
                Open to Work · Full-time & Freelance
              </span>
            </motion.div>

            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.text}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
                animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: 0.65, delay: 0.3 + index * 0.1, ease: easeOutExpo }}
                whileHover={{ scale: 1.015 }}
              >
                {detail.href ? (
                  <a
                    href={detail.href}
                    target={detail.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex w-full items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-terminal/40 hover:bg-terminal/10"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] font-mono text-[11px] text-terminal/70 transition-all duration-300 group-hover:border-terminal/50 group-hover:text-terminal">
                      {detail.icon}
                    </span>
                    <span className="font-body text-sm text-cream/65 transition-colors duration-300 group-hover:text-cream">
                      {detail.text}
                    </span>
                    <span className="ml-auto font-mono text-xs text-cream/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-terminal">
                      →
                    </span>
                  </a>
                ) : (
                  <div className="flex w-full items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-md">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] font-mono text-[11px] text-terminal/70">
                      {detail.icon}
                    </span>
                    <span className="font-body text-sm text-cream/65">{detail.text}</span>
                  </div>
                )}
              </motion.div>
            ))}

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={isInView || shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-2 font-mono text-[11px] uppercase tracking-widest text-cream/30"
            >
              ⟳ Typical response time: &lt; 24 hours
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
