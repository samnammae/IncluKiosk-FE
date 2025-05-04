export const theme = {
  colors: {
    standard: '#1E40AF',
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
  },
  fonts: {
    sizes: {
      cs: '10px',
      cl: '12px',
      ms: '14px',
      mm: '16px',
      ml: '18px',
      ts: '22px',
      tl: '24px',
    },
    weights: {
      light: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  device: {
    mobile: `screen and (min-width: 355px) and (max-width:767px)`,
    tablet: `screen and (min-width:768px) and (max-width:1023px)`,
    laptop: `screen and (min-width: 1024px)`,
  },
} as const;

export type Theme = typeof theme;

export default theme;
