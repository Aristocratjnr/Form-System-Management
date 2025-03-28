import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'banner': '#d3e3fd',
      },
      borderRadius: {
        'banner': '24px',
      },
      maxWidth: {
        'desktop-banner': '700px',
      },
      minHeight: {
        'desktop-banner': '50vh',
        'mobile-banner': '23vh',
      },

    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive'],
      borderRadius: ['responsive'],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "black"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: false, // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;