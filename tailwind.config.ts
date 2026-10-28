import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0922",
        panel: "#15103A",
        raised: "#1D1750",
        line: "#2C2562",
        mist: "#B8ACFF",
        violet: { DEFAULT: "#7C5CFF", soft: "#9B82FF" },
        paper: "#F3F0FF",
        sub: "#A39CD0",
        coral: "#FF6B57",
        live: "#3DDC97",
        amber: "#FFB84D",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        body: ['"Figtree Variable"', "system-ui", "sans-serif"],
      },
      keyframes: {
        bob: { "0%": { transform: "translateY(-5px)" }, "100%": { transform: "translateY(5px)" } },
        pulse2: { "0%": { transform: "scale(.6)", opacity: ".8" }, "100%": { transform: "scale(1.8)", opacity: "0" } },
      },
      animation: { bob: "bob 5.5s ease-in-out infinite alternate", pulse2: "pulse2 1.8s ease-out infinite" },
    },
  },
  plugins: [],
};
export default config;
