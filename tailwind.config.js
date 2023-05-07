/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/app/**/*.{ts,tsx}", "src/ui/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
