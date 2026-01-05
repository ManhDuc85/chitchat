import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        minecraft: ['VT323', 'monospace'],
      },
      colors: {
        mc: {
          grass: '#5E8E62',
          darkgrass: '#4A7C4E',
          deepgrass: '#2F5F2F',
          dirt: '#8B7355',
          stone: '#7F7F7F',
          darkstone: '#4A4A4A',
          wood: '#8B6F47',
          darkwood: '#6B5433',
          gold: '#C6A664',
          darkgold: '#A88A54',
          red: '#D32F2F',
        }
      },
      animation: {
        border: "border 4s linear infinite",
        mcPulse: "mcPulse 2s infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        mcPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      boxShadow: {
        'mc': '4px 4px 0px rgba(0,0,0,0.5)',
        'mc-lg': '6px 6px 0px rgba(0,0,0,0.4)',
        'mc-xl': '8px 8px 0px rgba(0,0,0,0.5)',
        'mc-inner': 'inset 2px 2px 3px rgba(255,255,255,0.25), inset -2px -2px 3px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"],
  },
};