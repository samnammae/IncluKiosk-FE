export const theme = {
  colors: {
    main: 'var(--main-color)',
    sub: 'var(--sub-color)',
    text: 'var(--text-color)',
    disabled: 'var(--disabled-color)',
    standard: '#1E40AF',
    standardText: '#212529',
    background: '#1e3a8a',
    white: '#ffffff',
    grey: {
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#666666',
      700: '#333333',
    },
    warning: '#FF3B30',
  },
  fonts: {
    sizes: {
      xs: '18px',
      sm: '24px',
      md: '32px',
      lg: '40px',
      xl: '48px',
      logo: '128px',
    },
    weights: {
      light: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.2)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  device: {
    mobile: `screen and (min-width: 355px) and (max-width:767px)`,
    tablet: `screen and (min-width:768px) and (max-width:1023px)`,
    laptop: `screen and (min-width: 1024px)`,
  },
} as const;

export type Theme = typeof theme;

export default theme;
