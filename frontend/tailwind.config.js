import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
    daisyui: {
    themes: [
      {
        claimgen: {
          "primary": "#5d4037",
          "secondary": "#a89078",
          "neutral": "#2d2424",
          "base-100": "#fdfaf6",
          "base-200": "#f5f0e1",    
          "base-content": "#2d2424", 
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.3rem",
          
          "info": "#60a5fa",
          "success": "#15803d",
          "warning": "#d97706",
          "error": "#b91c1c",
        },
      },
    ],
  },
}