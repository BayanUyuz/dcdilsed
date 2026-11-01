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
          sidebar: '#1e1f22',
          channels: '#2b2d31',
          chat: '#313338',
          chathover: '#2e3035',
          members: '#2b2d31',
          input: '#383a40',
          darkest: '#111214',
          userdock: '#232428',
          blurple: '#2563eb', // Beautiful Royal Sapphire Blue
          blurpleHover: '#1d4ed8', // Deep Royal Blue
          dilsedBlue: '#2563eb',
          dilsedBlueHover: '#1d4ed8',
          green: '#23a55a',
          yellow: '#f0b232',
          red: '#f23f43',
          textMuted: '#949ba4',
          textNormal: '#dbdee1',
          textHeader: '#f2f3f5',
          divider: '#3f4147',
          activeChannel: '#35373c',
          hoverChannel: '#313338'
        }
      },
      fontFamily: {
        sans: ['"gg sans"', '"Noto Sans"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
