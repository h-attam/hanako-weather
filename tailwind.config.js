/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: '#FFB7C5',
        matcha: '#88B5A1',
        cloud: '#E8E3DF',
        washi: '#FDF6F0',
        night: '#2C3E50',
        momo: '#FF6B8A',
        yuki: '#F0F4F8',
      },
      fontFamily: {
        japanese: ['"Zen Maru Gothic"', 'sans-serif'],
        body: ['"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sakura-fall': 'sakura 10s linear infinite',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sakura: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}