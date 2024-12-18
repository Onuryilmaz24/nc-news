/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'phone': '640px',
      // => @media (min-width: 640px) { ... }

      'tablet': '1024px',
      // => @media (min-width: 1024px) { ... }

      'laptop': '1280px',
      // => @media (min-width: 1280px) { ... }

      'desktop': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

