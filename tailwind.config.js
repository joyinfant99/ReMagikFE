/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'slack-purple': '#4A154B',
        'gmail-red': '#EA4335',
        'outlook-blue': '#0078D4',
      },
    },
  },
  plugins: [],
}
