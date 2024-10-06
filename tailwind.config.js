/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindcss_animated from "tailwindcss-animated"
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [daisyui, tailwindcss_animated],
    daisyui: {
        themes: ["dark"],
    },
};
