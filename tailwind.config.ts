import type { Config } from "tailwindcss";

const config = {
  darkMode: ["selector"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        ib: "inset 0 -1em 0.3em -0.5em rgb(0 0 0 / 30%)",
      },
      backgroundImage: {
        layout: "linear-gradient(354deg, rgb(221, 221, 221) 20vh, rgb(19, 74, 86) 20.3vh)",
        login: "url(var(--login-img))",
      },
      textColor: {
        service: {
          up: "hsl(var(--up-foreground))",
          down: "hsl(var(--down-foreground))",
        },
      },
      colors: {
        service: {
          up: "hsl(var(--up-background))",
          down: "hsl(var(--down-background))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
