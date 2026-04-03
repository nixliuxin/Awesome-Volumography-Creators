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
        'xs': ['11px', { lineHeight: '1.5' }],
        'sm': ['13px', { lineHeight: '1.5' }],
        'base': ['15px', { lineHeight: '1.5' }],
        'md': ['16px', { lineHeight: '1.5' }],
        'lg': ['18px', { lineHeight: '1.5' }],
        'xl': ['24px', { lineHeight: '1.5' }],
        '2xl': ['32px', { lineHeight: '1.3' }],
        '3xl': ['48px', { lineHeight: '1.2' }],
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
