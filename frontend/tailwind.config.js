/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505', // Very dark, almost black
                surface: '#121212',
                primary: '#FFFFFF',
                secondary: '#A1A1AA',
                accent: '#3B82F6', // Blue accent for small details
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #202020 1px, transparent 1px), linear-gradient(to bottom, #202020 1px, transparent 1px)",
            },
            backgroundSize: {
                'grid': '40px 40px',
            }
        },
    },
    plugins: [],
}
