// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // مهم جداً علشان Tailwind يشتغل مع React
  ],
  theme: {
    extend: {
      backgroundColor:{
        phtaloGreen: '#0A3D2A',
        phtaloGreenLight: '#0B4E3A',
      }
    },
  },
  plugins: [],
}
