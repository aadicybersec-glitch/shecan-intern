/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          base: "#050505",
          panel: "#0a0a0a",
          card: "#121212",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          purple: "#6366f1",
          pink: "#ec4899",
          violet: "#a855f7",
          glow: "rgba(99, 102, 241, 0.15)",
        }
      },
      fontFamily: {
        sans: ["Inter", "Satoshi", "sans-serif"],
        display: ["Plus Jakarta Sans", "Space Grotesk", "sans-serif"],
      },
      animation: {
        "orb-float-slow": "orb-float 20s infinite alternate ease-in-out",
        "orb-float-medium": "orb-float 15s infinite alternate-reverse ease-in-out",
        "text-gradient": "text-gradient 8s linear infinite",
      },
      keyframes: {
        "orb-float": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(40px, -60px) scale(1.15)" },
          "100%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        "text-gradient": {
          "0%, 100%": { "background-size": "200% 200%", "background-position": "left center" },
          "50%": { "background-size": "200% 200%", "background-position": "right center" },
        }
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
