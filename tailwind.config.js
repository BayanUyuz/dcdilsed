/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          sidebar: '#070709',
          channels: '#060608',
          chat: '#09090c',
          chathover: '#121217',
          members: '#060608',
          input: '#0c0c10',
          darkest: '#050507',
          userdock: '#070709',
          blurple: '#f59e0b',
          blurpleHover: '#d97706',
          dilsedGold: '#f59e0b',
          dilsedGoldHover: '#fbbf24',
          green: '#10b981',
          yellow: '#f59e0b',
          red: '#ef4444',
          textMuted: '#c5a86a',
          textNormal: '#fef3c7',
          textHeader: '#fde68a',
          divider: 'rgba(245, 158, 11, 0.2)',
          activeChannel: 'rgba(245, 158, 11, 0.16)',
          hoverChannel: 'rgba(245, 158, 11, 0.08)'
        }
      },
      fontFamily: {
        sans: ['"gg sans"', '"Noto Sans"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
