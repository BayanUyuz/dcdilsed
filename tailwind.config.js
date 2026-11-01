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
          sidebar: '#08080a',
          channels: '#0d0d10',
          chat: '#111114',
          chathover: '#16161a',
          members: '#0d0d10',
          input: '#18181c',
          darkest: '#040405',
          userdock: '#09090c',
          blurple: '#d4af37', // Polished Regal Gold
          blurpleHover: '#c59b27', // Rich Deep Gold
          dilsedGold: '#d4af37',
          dilsedGoldHover: '#f3e5ab',
          green: '#23a55a',
          yellow: '#f0b232',
          red: '#f23f43',
          textMuted: '#8b8d96',
          textNormal: '#e0e1e6',
          textHeader: '#ffffff',
          divider: '#202126',
          activeChannel: '#1c1d24',
          hoverChannel: '#15161b'
        }
      },
      fontFamily: {
        sans: ['"gg sans"', '"Noto Sans"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
