"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(0);

  // ── Fix: useState so both server and client start with the same value ──
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Only runs on the client — safe to access navigator here
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (isMobile) return;

    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (Math.abs(latest - lastProgressRef.current) < 0.005) return;
    lastProgressRef.current = latest;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = latest * v.duration;
      rafRef.current = null;
    });
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Mobile: static poster only ──
  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-50 h-screen w-full bg-black"
        style={{
          backgroundImage: "url('poster.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      />
    );
  }

  // ── Desktop: full scroll-scrubbed video ──
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 h-screen w-full overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src="background.mp4"
        className="h-full w-full object-cover opacity-50"
        preload="auto"
        muted
        playsInline
        tabIndex={-1}
        poster="poster.png"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}