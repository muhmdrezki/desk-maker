import type { CSSProperties, ReactNode } from "react";
import type { ArtId } from "@/lib/catalog";

/**
 * Flat CSS-shape illustrations, ported 1:1 from design-reference/"Tech Item Art.dc.html".
 * Coordinates are the handoff's logical pixels. Production plan: swap for SVG/WebP
 * art in the same style, keeping each item's box size so scene layout is unchanged.
 */

type Shape = [left: number, top: number, width: number, height: number, background: string, extra?: CSSProperties];

const Shapes = ({ w, h, shapes, children }: { w: number; h: number; shapes: Shape[]; children?: ReactNode }) => (
  <div style={{ position: "relative", width: w, height: h }}>
    {shapes.map(([left, top, width, height, background, extra], i) => (
      <div key={i} style={{ position: "absolute", left, top, width, height, background, ...extra }} />
    ))}
    {children}
  </div>
);

const r = (borderRadius: CSSProperties["borderRadius"], extra?: CSSProperties): CSSProperties => ({ borderRadius, ...extra });

const DeskElectric = () => (
  <Shapes w={480} h={175} shapes={[
    [40, 18, 400, 10, "#2A2D31"],
    [80, 28, 22, 70, "#2A2D31"],
    [83, 98, 16, 66, "#3A3E43"],
    [378, 28, 22, 70, "#2A2D31"],
    [381, 98, 16, 66, "#3A3E43"],
    [41, 163, 100, 12, "#1E2124", r(6)],
    [339, 163, 100, 12, "#1E2124", r(6)],
    [0, 0, 480, 18, "#E8D5B7", r(4)],
    [0, 14, 480, 4, "#D6BF9C", r("0 0 4px 4px")],
    [404, 18, 46, 11, "#1E2124", r("0 0 4px 4px")],
    [410, 20, 15, 6, "#7EE2A8", r(1)],
  ]} />
);

const DeskDual = () => (
  <Shapes w={480} h={175} shapes={[
    [40, 18, 400, 12, "#2A2D31"],
    [76, 30, 28, 44, "#2A2D31"],
    [79, 74, 22, 44, "#3A3E43"],
    [82, 118, 16, 46, "#4A4F55"],
    [376, 30, 28, 44, "#2A2D31"],
    [379, 74, 22, 44, "#3A3E43"],
    [382, 118, 16, 46, "#4A4F55"],
    [40, 163, 100, 12, "#1E2124", r(6)],
    [340, 163, 100, 12, "#1E2124", r(6)],
    [0, 0, 480, 18, "#FAFAF8", r(4)],
    [0, 14, 480, 4, "#DCDCD6", r("0 0 4px 4px")],
    [404, 18, 50, 12, "#1E2124", r("0 0 4px 4px")],
    [410, 20, 18, 7, "#7EE2A8", r(1)],
    [432, 21, 5, 5, "#6B7078", r("50%")],
    [441, 21, 5, 5, "#6B7078", r("50%")],
  ]} />
);

const DeskMech = () => (
  <Shapes w={480} h={175} shapes={[
    [40, 18, 400, 9, "#3A3E43"],
    [82, 27, 18, 137, "#3A3E43"],
    [380, 27, 18, 137, "#3A3E43"],
    [41, 163, 100, 12, "#2A2D31", r(6)],
    [339, 163, 100, 12, "#2A2D31", r(6)],
    [0, 0, 480, 18, "#C89A6B", r(4)],
    [0, 14, 480, 4, "#AE8052", r("0 0 4px 4px")],
    [452, 18, 4, 30, "#6B7078"],
    [448, 46, 20, 6, "#2A2D31", r(3)],
  ]} />
);

const Chair = () => (
  <Shapes w={170} h={240} shapes={[
    [55, 0, 60, 26, "#2A2D31", r(13)],
    [80, 24, 10, 14, "#3A3E43"],
    [35, 36, 100, 112, "repeating-linear-gradient(0deg,#33373C 0 3px,#2A2D31 3px 5px)", r("30px 30px 18px 18px", { border: "5px solid #1E2124", boxSizing: "border-box" })],
    [55, 102, 60, 12, "#4A4F55", r(6)],
    [14, 116, 14, 42, "#1E2124", r(7)],
    [142, 116, 14, 42, "#1E2124", r(7)],
    [25, 146, 120, 28, "#1E2124", r(14)],
    [80, 174, 10, 42, "#8A8F95"],
    [30, 212, 110, 9, "#1E2124", r(5)],
    [24, 220, 16, 16, "#2A2D31", r("50%")],
    [77, 220, 16, 16, "#2A2D31", r("50%")],
    [130, 220, 16, 16, "#2A2D31", r("50%")],
  ]} />
);

/** Screen contents render inside a clipped, positioned panel. */
const Screen = ({ l, t, w, h, bg, radius, shapes }: { l: number; t: number; w: number; h: number; bg: string; radius: CSSProperties["borderRadius"]; shapes: Shape[] }) => (
  <div style={{ position: "absolute", left: l, top: t, width: w, height: h, borderRadius: radius, overflow: "hidden", background: bg }}>
    {shapes.map(([left, top, width, height, background, extra], i) => (
      <div key={i} style={{ position: "absolute", left, top, width, height, background, ...extra }} />
    ))}
  </div>
);

const Mon24 = () => (
  <Shapes w={150} h={118} shapes={[
    [69, 88, 12, 24, "#6B7078"],
    [47, 110, 56, 8, "#3A3E43", r(4)],
    [0, 0, 150, 90, "#1E2124", r(6)],
  ]}>
    <Screen l={4} t={4} w={142} h={78} radius={3} bg="linear-gradient(180deg,#FFD9AE,#FB9E7C)" shapes={[
      [54, 24, 34, 34, "#FFF0D6", r("50%")],
      [0, 54, 142, 24, "#2F8F83"],
    ]} />
  </Shapes>
);

const Mon27 = () => (
  <Shapes w={176} h={132} shapes={[
    [82, 100, 12, 26, "#6B7078"],
    [56, 124, 64, 8, "#3A3E43", r(4)],
    [0, 0, 176, 102, "#1E2124", r(6)],
  ]}>
    <Screen l={4} t={4} w={168} h={90} radius={3} bg="#1B2430" shapes={[
      [0, 0, 34, 90, "#141B24"],
      [44, 12, 60, 4, "#7EE2A8", r(2)],
      [52, 22, 90, 4, "#8AB4F8", r(2)],
      [52, 32, 54, 4, "#F9B872", r(2)],
      [44, 42, 30, 4, "#7EE2A8", r(2)],
      [52, 52, 100, 4, "#56606E", r(2)],
      [52, 62, 70, 4, "#8AB4F8", r(2)],
      [44, 72, 40, 4, "#56606E", r(2)],
    ]} />
  </Shapes>
);

const Mon34 = () => (
  <Shapes w={230} h={130} shapes={[
    [109, 94, 12, 30, "#6B7078"],
    [81, 122, 68, 8, "#3A3E43", r(4)],
    [0, 0, 230, 96, "linear-gradient(90deg,#141619,#24282C 20%,#24282C 80%,#141619)", r("14px / 8px")],
  ]}>
    <Screen l={5} t={5} w={220} h={84} radius="10px / 5px" bg="#101820" shapes={[
      [18, 44, 6, 22, "#3FBF7F"],
      [32, 36, 6, 26, "#3FBF7F"],
      [46, 42, 6, 18, "#F26B5B"],
      [60, 28, 6, 28, "#3FBF7F"],
      [74, 22, 6, 20, "#3FBF7F"],
      [88, 30, 6, 16, "#F26B5B"],
      [102, 16, 6, 26, "#3FBF7F"],
      [130, 10, 1, 66, "#2A3642"],
      [142, 14, 64, 5, "#3FBF7F", r(2)],
      [142, 26, 46, 5, "#56606E", r(2)],
      [142, 38, 58, 5, "#F26B5B", r(2)],
      [142, 50, 40, 5, "#56606E", r(2)],
      [142, 62, 52, 5, "#3FBF7F", r(2)],
    ]} />
  </Shapes>
);

const Keyboard = () => (
  <Shapes w={120} h={12} shapes={[
    [0, 2, 120, 10, "#2E3236", r(3)],
    [5, 4, 110, 5, "repeating-linear-gradient(90deg,#5A6066 0 8px,#2E3236 8px 9px)"],
  ]} />
);

const Mouse = () => (
  <Shapes w={24} h={13} shapes={[
    [0, 0, 24, 13, "#3A3E43", r("12px 12px 5px 5px")],
    [11, 2, 2, 5, "#8A8F95", r(1)],
  ]} />
);

const LaptopStand = () => (
  <Shapes w={100} h={86} shapes={[
    [24, 52, 6, 32, "#A8ADB3", { transform: "rotate(-12deg)" }],
    [70, 52, 6, 32, "#A8ADB3", { transform: "rotate(12deg)" }],
    [12, 82, 76, 4, "#9399A0", r(2)],
    [14, 0, 72, 48, "#C9CDD2", r(4)],
    [17, 3, 66, 42, "#24384A", r(2)],
    [23, 10, 30, 3, "#FFD9AE", r(2)],
    [23, 18, 44, 3, "#7EE2A8", r(2)],
    [23, 26, 24, 3, "#8AB4F8", r(2)],
    [6, 48, 88, 6, "#B8BDC3", r(3)],
  ]} />
);

const Lamp = () => (
  <Shapes w={110} h={140} shapes={[
    [10, 22, 110, 118, "radial-gradient(ellipse at 55% 0%,rgba(255,221,150,.55),rgba(255,221,150,0) 70%)"],
    [26, 16, 5, 114, "#D5D5D0"],
    [24, 12, 82, 9, "#EDEDEA", r(5)],
    [36, 20, 66, 3, "#FFE3A3", r(2)],
    [0, 128, 58, 12, "#EDEDEA", r(6, { boxShadow: "inset 0 -3px 0 #D5D5D0" })],
  ]} />
);

const LightBar = () => (
  <Shapes w={120} h={48} shapes={[
    [4, 8, 112, 40, "linear-gradient(180deg,rgba(255,227,163,.6),rgba(255,227,163,0))", { clipPath: "polygon(18% 0,82% 0,100% 100%,0 100%)" }],
    [0, 0, 120, 8, "#2A2D31", r(4)],
    [52, 6, 16, 10, "#1E2124", r(2)],
  ]} />
);

const Power = () => (
  <Shapes w={110} h={24} shapes={[
    [0, 6, 98, 16, "#F4F4F2", r(6, { boxShadow: "inset 0 -3px 0 #D5D5D0" })],
    [12, 11, 14, 5, "#9AA0A6", r(2)],
    [34, 11, 14, 5, "#9AA0A6", r(2)],
    [56, 11, 14, 5, "#9AA0A6", r(2)],
    [78, 11, 8, 4, "#7EE2A8", r(1)],
    [96, 12, 14, 3, "#2A2D31"],
  ]} />
);

const leaf = "50% 50% 10% 10% / 90% 90% 10% 10%";
const Plant = () => (
  <Shapes w={110} h={200} shapes={[
    [30, 20, 20, 130, "#2E7D5B", r(leaf, { transform: "rotate(-10deg)" })],
    [48, 0, 22, 150, "#3F9A6E", r(leaf)],
    [64, 30, 20, 120, "#1F6B4A", r(leaf, { transform: "rotate(12deg)" })],
    [14, 60, 18, 96, "#3F9A6E", r(leaf, { transform: "rotate(-24deg)" })],
    [80, 66, 17, 90, "#2E7D5B", r(leaf, { transform: "rotate(26deg)" })],
    [20, 140, 70, 60, "#D9774E", r("6px 6px 18px 18px")],
    [20, 140, 70, 10, "#C4643D", r("6px 6px 0 0")],
  ]} />
);

const ART: Record<ArtId, () => ReactNode> = {
  desk_electric: DeskElectric,
  desk_dual: DeskDual,
  desk_mech: DeskMech,
  chair: Chair,
  mon24: Mon24,
  mon27: Mon27,
  mon34: Mon34,
  keyboard: Keyboard,
  mouse: Mouse,
  laptopstand: LaptopStand,
  lamp: Lamp,
  lightbar: LightBar,
  power: Power,
  plant: Plant,
};

/** Decorative: callers provide the accessible name (card title, scene alt text). */
export function ItemArt({ id }: { id: ArtId }) {
  const Art = ART[id];
  return (
    <div aria-hidden="true">
      <Art />
    </div>
  );
}

/** Art centred in a well at a given scale (product cards, line-item thumbnails). */
export function ItemThumb({ id, scale }: { id: ArtId; scale: number }) {
  return (
    <div className="flex-none" style={{ transform: `scale(${scale})` }}>
      <ItemArt id={id} />
    </div>
  );
}
