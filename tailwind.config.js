/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 20%, 95%)',
        text: 'hsl(210, 20%, 10%)',
        accent: 'hsl(130, 70%, 50%)',
        danger: 'hsl(0, 70%, 50%)',
        primary: 'hsl(210, 70%, 50%)',
        surface: 'hsl(210, 20%, 100%)',
        warning: 'hsl(34, 70%, 50%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 20%, 10%, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
