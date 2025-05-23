import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ["var(--font-bricolage)"],
        nunito: ["var(--font-nunito)"],
      },
      colors: {
        primary: {
          DEFAULT: "#b7e6a1",
          hover: "#a5d990",
        },
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
      boxShadow: {
        dialog: '0 8px 30px rgb(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};

export default config; 