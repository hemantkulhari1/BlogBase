module.exports = {
content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: {
extend: {
colors: {
primary: {
50: '#eef2ff',
100: '#e0e7ff',
500: '#0F62FE',
},
accent: '#FF6B6B'
},
fontFamily: {
sans: ['Inter', 'system-ui', 'sans-serif'],
serif: ['Merriweather', 'serif']
}
}
},
plugins: [require('@tailwindcss/line-clamp')],
}