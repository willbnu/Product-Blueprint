/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                dark: {
                    bg: '#0a0a0a',
                    surface: '#141414',
                    border: '#262626',
                    text: '#fafafa',
                    muted: '#a3a3a3',
                },
                accent: {
                    purple: '#a855f7',
                    pink: '#ec4899',
                    blue: '#3b82f6',
                    cyan: '#06b6d4',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['DM Sans', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in': 'slideIn 0.5s ease-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)' },
                },
            },
        },
    },
    plugins: [],
};
