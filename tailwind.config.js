/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./website/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'primitive': {
          '100': '#ffffff',
          '75': '#bfbfbf',
          '10': '#1a1a1a',
          '0': '#000000',
        },
      },
      fontFamily: {
        'sans': ['PxGrotesk', 'system-ui', 'sans-serif'],
        'mono': ['PxGroteskMono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        'md': '8px',
        'lg': '8px',
        'xl': '12px',
      },
      backdropBlur: {
        'xl': '24px',
        '2xl': '37.5px',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
}
