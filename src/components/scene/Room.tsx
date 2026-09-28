import type { CSSProperties } from "react";

const abs = (left: number, top: number, width: number, height: number, style: CSSProperties = {}): CSSProperties => ({
  position: "absolute",
  left,
  top,
  width,
  height,
  ...style,
});

/**
 * Static room behind the live preview (Bali villa: window with palms and hills,
 * light beam, terracotta arch print, wooden floor). Ported 1:1 from "Tech Scene.dc.html".
 */
export function Room() {
  return (
    <div aria-hidden="true">
      {/* Window */}
      <div
        style={abs(48, 44, 220, 290, {
          boxSizing: "border-box",
          border: "10px solid #FFFFFF",
          borderRadius: 10,
          overflow: "hidden",
          background: "linear-gradient(180deg,#FDEBD3,#F7CFA3)",
        })}
      >
        <div style={abs(96, 44, 36, 36, { borderRadius: "50%", background: "#FFF6E6" })} />
        <div style={abs(-30, 190, 280, 120, { borderRadius: "50%", background: "#A9CFA0" })} />
        <div style={abs(120, 210, 160, 90, { borderRadius: "50%", background: "#8DBE88" })} />
        <div style={abs(150, -30, 90, 34, { borderRadius: "50%", background: "#3F8F63", transform: "rotate(30deg)" })} />
        <div style={abs(120, -6, 84, 28, { borderRadius: "50%", background: "#2E7D5B", transform: "rotate(-14deg)" })} />
        <div style={abs(168, 16, 70, 26, { borderRadius: "50%", background: "#4FA374", transform: "rotate(58deg)" })} />
        <div style={abs(95, 0, 10, 270, { background: "#FFFFFF" })} />
      </div>
      {/* Sill */}
      <div style={abs(38, 330, 240, 10, { borderRadius: 5, background: "#FFFFFF" })} />
      {/* Light beam */}
      <div
        style={abs(200, 44, 200, 400, {
          background: "linear-gradient(180deg,rgba(255,236,204,0),rgba(255,236,204,.6) 60%,rgba(255,236,204,0))",
          transform: "skewX(30deg)",
          transformOrigin: "0 0",
        })}
      />
      {/* Arch print */}
      <div
        style={abs(650, 70, 104, 136, {
          boxSizing: "border-box",
          border: "8px solid #FFFFFF",
          borderRadius: 4,
          background: "#F6E3CF",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(60,40,20,.08)",
        })}
      >
        <div style={abs(18, 34, 52, 80, { borderRadius: "26px 26px 0 0", background: "#D9774E" })} />
        <div style={abs(44, 18, 24, 24, { borderRadius: "50%", background: "#2E7D5B" })} />
      </div>
      {/* Floor */}
      <div style={abs(0, 440, 800, 80, { background: "repeating-linear-gradient(90deg,#E8DAC5 0 118px,#DFCFB7 118px 120px)" })} />
      <div style={abs(0, 436, 800, 5, { background: "#E0D0B8" })} />
    </div>
  );
}
