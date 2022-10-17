module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        "./node_modules/flowbite/**/*.js"
      ],
    mode: 'jit',
    purge: ['./src/**/*.js', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Slab"', 'serif'],
            body: ['Roboto', 'sans-serif'],
            poppins: ["Poppins", "sans-serif"],

        },
        extend: {
            backgroundImage: () => ({
                'login-background':
                    "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-1920x1280.jpg')",
                'landing-background':
                    "linear-gradient(rgba(0,0,0, 0), rgba(0,0,0, 0)), url('/src/assets/img/MuseumKeris.png')",
                'profile-background':
                    "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/Landing/header_bawah.png')",
                'landing-bawah':
                    "linear-gradient(rgba(243, 244, 246, 1), rgba(243, 244, 246, 0)), url('/src/assets/img/Landing/header_bawah.png')",
                'inputdata-backgroung':
                    "linear-gradient(rgba(243, 244, 246, 0), rgba(243, 244, 246, 0)), url('/src/assets/img/InputData/headerInput.png')",
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin'),
    ],
};
