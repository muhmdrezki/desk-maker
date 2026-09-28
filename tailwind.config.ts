import type { Config } from "tailwindcss";

/**
 * Design tokens from design-reference/README.md ("Design Tokens").
 * Brand colours are the handoff's assumptions — swap for monis.rent's real tokens.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121417",
        body: "#3C4043",
        muted: "#5F6368",
        subtle: "#6B6F74",
        page: "#F6F5F1",
        canvas: "#E7E5DF",
        fill: "#F4F3EF",
        well: "#F6F3EE",
        line: {
          DEFAULT: "#ECEAE4",
          strong: "#E2E0DA",
          row: "#F0EEE9",
        },
        brand: {
          DEFAULT: "#0E6B53",
          hover: "#0A5140",
          tint: "#E3F1EA",
          selected: "#F2F9F5",
          dot: "#16A34A",
        },
        save: {
          bg: "#FFEDE3",
          text: "#B5400F",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2.5xl": "20px",
        "4xl": "28px",
      },
      boxShadow: {
        segment: "0 1px 3px rgba(0,0,0,.12)",
        chip: "0 6px 20px rgba(20,20,20,.14)",
        modal: "0 30px 80px rgba(20,20,20,.16)",
      },
      transitionTimingFunction: {
        pop: "cubic-bezier(.34,1.56,.64,1)",
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(-40px) rotate(0)" },
          "100%": { transform: "translateY(110vh) rotate(540deg)" },
        },
      },
    },
  },
};

export default config;
