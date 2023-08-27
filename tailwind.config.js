/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1b1b1b",
        // primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        'primary-black': '#1b1b1b',
        'secondary-white': '#c7c7c7',
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      fontFamily: {
        'Arimo': ['Arimo', 'sans-serif'],
        "Oswald": ['Oswald', 'sans-serif'],
        "Pacifico":["Pacifico", "cursive"],
        "Sacramento":["Sacramento", "cursive"],
      },

      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
      animation: {
          'spin-slow': 'spin 30s linear infinite',
      },

    },
  },
  // plugins: [
  //   require('flowbite/plugin')
  // ],
}

