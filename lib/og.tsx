import { ImageResponse } from "next/og";

// 1200×630 social preview cards (WhatsApp, LinkedIn, X), one per side of the site.
export const ogSize = { width: 1200, height: 630 };

export function servicesOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#2B1F18",
          color: "#FAF3EA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 6, color: "#DE8C5E" }}>
          WEB DEVELOPMENT · MUMBAI
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            Websites that bring you
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, color: "#DE8C5E" }}>
            more customers.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30 }}>
          <div style={{ display: "flex", fontWeight: 800, fontSize: 40 }}>Jeetu Prasad</div>
          <div style={{ display: "flex", color: "#C9B8A8" }}>jeetuprasad.in</div>
        </div>
      </div>
    ),
    ogSize,
  );
}

export function portfolioOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#080808",
          color: "#F5F0E8",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#39FF14" }}>
          {"> FULL STACK DEVELOPER"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
            JEETU PRASAD
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "rgba(245,240,232,0.7)" }}>
            MERN · Next.js · TypeScript · AI integrations
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "rgba(245,240,232,0.6)" }}>
          <div style={{ display: "flex" }}>Mumbai, India</div>
          <div style={{ display: "flex", color: "#39FF14" }}>jeetuprasad.in/portfolio</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
