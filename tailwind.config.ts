import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    colors: {
      primarycolor: "#486A1D",
      primaryGreens: "#E4E8E0",
      Lightgrey: "#f2f2f2",
      primarygrey: "#F8F8F8",
      darkgrey: "#171717",
      bannerColor: "#FFBB12",
      secondaryOrange: "#FF9900",
      secodarycolor: "#171717",
      thirdcolor: "#BCBCBC",
      darkgreen: "#3B5A13",
      lightgreen: "#73A930",
      Thirdcolor: "#202020",
      FourthColor: "#19213D",
      PrimaryYellow: "#FFC107",
      Primarygreen: "#008397",
      Primaryblue: "#27AEFF",
      Linkdin: "#0077B5",
      Twitter: "#03A9F4",
      Dribble: "#EA4C88",
      PrimaryFacebook: "#2D7EFF",
      PrimaryLinkdin: "#0978C4",
      PrimaryTwitter: "#0BA0F6",
      PrimaryInstagram: "#C937AA",
      Primarycolors: "#416119",
      Darkcolor: "#3A5813",
      Lightgreens: "#F8FFF0",
      PrimaryDark: "#324D10",
      PrimaryOrange: "#FFBB12",
      secondaryBlue: "#2F80ED",
      secondaryGreen: "#486A1D",
      primaryRed: "#D63F3F",
      togglebg: "#4CAF50",
      togglegray: "#E4E4E4",
      tblgray: "#D9D9D9",
      primaryLightGreen: "#38C172",
      stepsgray: "#E1E1E1",
      chatbgrey: "#F0F0F0",
      secondaryBlack: "#000000",
      purple: "#663399",
      successBadge: "#e7ca7b",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
