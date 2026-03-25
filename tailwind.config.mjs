/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        plai: {
          primary: '#0064ff',
          secondary: '#00a7ff',
          dark: '#1b004f',
          black: '#0a0a14',
          text: '#393841',
          accent: '#c8a84e',
          cyan: '#00c9b7',
          magenta: '#e855a0',
          purple: '#7c3aed',
        }
      },
      fontFamily: {
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    },
  },
  plugins: [],
}
