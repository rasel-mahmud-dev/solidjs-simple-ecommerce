/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: { 1: "0 2px 9px 0px #44444494" }
        },
    },
    plugins: [],
}