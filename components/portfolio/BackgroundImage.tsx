import Image from "next/image";

// Fixed background for the portfolio: a single still frame instead of the old
// 100 MB scroll-scrubbed video. next/image serves a compressed copy sized to
// the visitor's screen (AVIF/WebP where supported).
export default function BackgroundImage() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-50 h-screen w-full overflow-hidden bg-black">
      <Image
        src="/poster.png"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover object-center opacity-50"
      />
    </div>
  );
}
