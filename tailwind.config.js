import { tailwindConfig } from '@storefront-ui/vue'
import defaultTheme from 'tailwindcss/defaultTheme'
import sfTypography from '@storefront-ui/typography'
import twElements from "tw-elements/dist/plugin.cjs"

module.exports = {
  presets: tailwindConfig,
  content: [
    "./app.vue",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    './**/*.vue', './node_modules/@storefront-ui/vue/**/*.{js,mjs}',

  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        'google-noto-sans': ['NotoSans', ...defaultTheme.fontFamily.sans],
        'google-noto-serif': ['NotoSans', ...defaultTheme.fontFamily.serif]
      },
      colors: {
        'primary': {
          '50': '#F5EEE6',
          '100': '#E9DAC9',
          '200': '#D6BFA5',
          '300': '#C0A17D',
          '400': '#A8835B',
          '500': '#8B5E3C',
          '600': '#7A5032',
          '700': '#66422A',
          '800': '#523523',
          '900': '#3E281A',
        },
        'secondary': {
          '50': '#FBF4E6',
          '100': '#F6E4C4',
          '200': '#EFD093',
          '300': '#E6B96A',
          '400': '#D9A14B',
          '500': '#C89B5A',
          '600': '#B08043',
          '700': '#916437',
          '800': '#74502C',
          '900': '#5A3E22',
        },
        'tertiary': {
          '50': '#FDF0EA',
          '100': '#F9D9C8',
          '200': '#F0B698',
          '300': '#E3916C',
          '400': '#D4724A',
          '500': '#A9652E',
          '600': '#92531F',
          '700': '#784217',
          '800': '#5E3311',
          '900': '#47260C',
        }
      },
    },
    fontFamily: {
      sans: ["DM Mono", "sans-serif"],
      mono: ["DM Mono", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    twElements,
    sfTypography,

  ],
};
