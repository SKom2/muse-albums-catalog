/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'albums-grid-cols': 'repeat(auto-fill, minmax(250px, 1fr))',
        'album-page-columns': 'minmax(250px, 390px) 1fr',
      },
      fontFamily: {
        'serif': "var(--font-montserrat)",
        'sans-serif': "var(--font-roboto)",
      },
      colors: {
        'background-default': "rgba(var(--muse-background-default))",
        'transparent': "rgba(var(--muse-color-transparent))",

        'screen-default': "rgba(var(--muse-screen-default))",

        'content-primary': "rgba(var(--muse-content-primary))",
        'content-secondary': "rgba(var(--muse-content-secondary))",
        'content-tertiary': "rgba(var(--muse-content-tertiary))",

        'btn-primary': "rgba(var(--muse-button-primary))",
        'btn-hover': "rgba(var(--muse-button-hover))",

        'btn-text': "rgba(var(--muse-button-text))",

        'error': "rgba(var(--muse-status-error))",

        'link-default': "rgba(var(--muse-action-link-default))",

        'input-default': "rgba(var(--muse-input-default))",
      },
      fontSize: {
        sm: "var(--font-size-sm)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        '2xl': "var(--font-size-2xl)",
        '3xl': "var(--font-size-3xl)",
        '4xl': "var(--font-size-4xl)",
      },
      lineHeight: {
        sm: "calc(var(--font-size-sm) * var(--line-height-sm))",
        md: "calc(var(--font-size-md) * var(--line-height-md))",
        lg: "calc(var(--font-size-lg) * var(--line-height-lg))",
        xl: "calc(var(--font-size-xl) * var(--line-height-xl))",
        '2xl': "calc(var(--font-size-2xl) * var(--line-height-md))",
      },
    },
  },
  plugins: [],
}