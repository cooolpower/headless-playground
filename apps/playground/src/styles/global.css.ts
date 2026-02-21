import { globalStyle, globalKeyframes } from '@vanilla-extract/css';

/* ============================================
   Global Animations
   ============================================ */
globalKeyframes('spin', {
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

globalKeyframes('badge-processing', {
  '0%': { transform: 'translate(50%, -50%) scale(1)', opacity: 1 },
  '50%': { transform: 'translate(50%, -50%) scale(1.1)', opacity: 0.8 },
  '100%': { transform: 'translate(50%, -50%) scale(1)', opacity: 1 },
});

/* ============================================
   Base Styles (base.css)
   ============================================ */
globalStyle('body', {
  maxWidth: '100vw',
  overflowX: 'hidden',
  height: '100%',
  backgroundImage: `
    linear-gradient(to bottom, transparent, var(--color-background) 800px),
    linear-gradient(to right, var(--color-divider) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-divider) 1px, transparent 1px)
  `,
  backgroundSize: '100% 100%, 40px 40px, 40px 40px',
  backgroundAttachment: 'fixed',
});

globalStyle('body', {
  color: 'var(--color-text)',
  background: 'var(--color-background)',
  fontFamily: 'var(--font-family-pretendard)',
  fontSize: 'var(--font-size-base)',
  lineHeight: 'var(--line-height-normal)',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  display: 'flex',
  flexDirection: 'column',
  // overflow: hidden; // 가로/세로 모두 숨기는 대신 가로만 숨기고 나머지는 자동
  overflowY: 'auto',
});

globalStyle('*', {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('hr', {
  backgroundColor: 'var(--color-divider)',
  border: 0,
  height: 'var(--border-width-thin)',
  margin: 'var(--spacing-base) 0',
});

/* ============================================
   Typography (.mainDoc, Headings)
   ============================================ */
globalStyle('ul, ol', {
  listStyle: 'disc',
  paddingLeft: 'var(--spacing-xl)',
  margin: '0 0 var(--spacing-base)',
});

// .mainDoc
globalStyle('.mainDoc', {
  maxWidth: '100%',
  width: '100%',
  lineHeight: 'var(--line-height-relaxed)',
  color: 'var(--color-text)',
});

globalStyle('.mainDoc h1', {
  fontSize: 'var(--font-size-4xl)',
  fontWeight: 'var(--font-weight-bold)',
  marginBottom: 'var(--spacing-xl)',
  marginTop: 0,
  lineHeight: 'var(--line-height-tight)',
  color: 'var(--color-text-heading)',
});

globalStyle('.mainDoc h2', {
  fontSize: 'var(--font-size-3xl)',
  fontWeight: 'var(--font-weight-semibold)',
  marginTop: 'var(--spacing-2xl)',
  marginBottom: 'var(--spacing-base)',
  lineHeight: 'var(--line-height-snug)',
  color: 'var(--color-text-heading)',
});

globalStyle('.mainDoc h3', {
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-semibold)',
  marginTop: 'var(--spacing-xl)',
  marginBottom: 'var(--spacing-md)',
  lineHeight: 'var(--line-height-snug)',
  color: 'var(--color-text-heading)',
});

globalStyle('.mainDoc h4', {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-semibold)',
  marginTop: 'var(--spacing-lg)',
  marginBottom: 'var(--spacing-sm)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-heading)',
});

globalStyle('.mainDoc p', {
  marginBottom: 'var(--spacing-base)',
  lineHeight: 'var(--line-height-relaxed)',
});

globalStyle('.mainDoc code', {
  backgroundColor: 'var(--color-surface)',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.9em',
  fontFamily: 'var(--font-family-nanumGothicCoding)',
  border: 'var(--border-width-thin) solid var(--color-border)',
});

globalStyle('.mainDoc pre', {
  backgroundColor: 'var(--color-surface)',
  padding: 'var(--spacing-base)',
  borderRadius: 'var(--radius-lg)',
  border: 'var(--border-width-thin) solid var(--color-border)',
  overflowX: 'auto',
  margin: 'var(--spacing-xl) 0',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 'var(--line-height-normal)',
});

globalStyle('.mainDoc pre code', {
  backgroundColor: 'transparent',
  padding: 0,
  borderRadius: 0,
  border: 'none',
  fontSize: 'inherit',
});

globalStyle('.mainDoc a', {
  color: 'var(--color-brand-primary)',
  textDecoration: 'underline',
  textUnderlineOffset: 'var(--spacing-xs)',
  transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
});

globalStyle('.mainDoc a:hover', {
  color: 'var(--color-brand-primary-hover)',
});

globalStyle('.mainDoc blockquote', {
  borderLeft: 'var(--border-width-medium) solid var(--color-border)',
  paddingLeft: 'var(--spacing-base)',
  margin: 'var(--spacing-xl) 0',
  color: 'var(--color-text-secondary)',
  fontStyle: 'italic',
});

// Global Headings
globalStyle('h1, h2, h3, h4, h5, h6', {
  color: 'var(--color-text-heading)',
});

globalStyle('p, li', {
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
});

// Adjacent siblings
globalStyle(
  'h1+p, h2+p, h3+p, h4+p, h5+p, h6+p, h1+div, h2+div, h3+div, h4+div, h5+div, h6+div, p+div, h3+ul, p+ul',
  {
    marginTop: 'var(--spacing-sm)',
  }
);

globalStyle('h3+h4', {
  marginTop: 'var(--spacing-base)',
});

globalStyle(
  'p+h1, p+h2, p+h3, p+h4, p+h5, p+h6, figure+h1, figure+h2, figure+h3, figure+h4, figure+h5, figure+h6, div+h3, div+h4',
  {
    marginTop: 'var(--spacing-xl)',
  }
);

/* ============================================
   Scrollbar
   ============================================ */
globalStyle('[data-sidebar]::-webkit-scrollbar', {
  width: 'var(--spacing-xs)',
  height: 'var(--spacing-xs)',
});

globalStyle('[data-sidebar]::-webkit-scrollbar-track', {
  background: 'transparent',
});

globalStyle('[data-sidebar]::-webkit-scrollbar-thumb', {
  background: 'var(--color-border)',
  borderRadius: 'var(--radius-full)',
  transition: 'background cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
});

globalStyle('[data-sidebar]::-webkit-scrollbar-thumb:hover', {
  background: 'var(--color-border-hover)',
});

globalStyle('[data-sidebar]::-webkit-scrollbar-corner', {
  background: 'transparent',
});

/* ============================================
   Table
   ============================================ */
globalStyle('table', {
  width: '100%',
  borderCollapse: 'collapse',
  margin: 'var(--spacing-xl) 0',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 'var(--line-height-normal)',
  borderRadius: 'var(--radius-xl)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)',
  border: 'var(--border-width-thin) solid var(--color-border)',
});

globalStyle('table th, table td', {
  padding: 'var(--spacing-md) var(--spacing-base)',
  textAlign: 'left',
  borderBottom: 'var(--border-width-thin) solid var(--color-divider)',
});

globalStyle('table td', {
  fontSize: 'var(--font-size-sm)',
});

globalStyle('table th', {
  backgroundColor: 'var(--color-surface)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text-heading)',
  borderBottom: 'var(--border-width-medium) solid var(--color-border)',
});

globalStyle('table tbody tr:nth-child(even)', {
  backgroundColor: 'var(--color-surface)',
});

globalStyle('table tbody tr:hover', {
  backgroundColor: 'var(--color-surface-hover)',
});

globalStyle('table code', {
  backgroundColor: 'var(--color-surface)',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.9em',
  fontFamily: 'var(--font-family-nanumGothicCoding)',
});

/* ============================================
   Code Block
   ============================================ */
globalStyle('[data-rehype-pretty-code-figure]', {
  position: 'relative',
  margin: 'var(--spacing-base) 0 0',
});

globalStyle('[data-rehype-pretty-code-figure]>pre', {
  margin: 0,
  padding: 'var(--spacing-base)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  border: 'var(--border-width-thin) solid var(--color-border)',
  overflowX: 'auto',
  fontSize: 'var(--font-size-md)',
  lineHeight: 'var(--line-height-relaxed)',
});

globalStyle('[data-rehype-pretty-code-figure]>pre>code', {
  backgroundColor: 'transparent',
  padding: 0,
  borderRadius: 0,
  fontSize: 'inherit',
  lineHeight: 'inherit',
});

// Light Theme overrides for code blocks
globalStyle('[data-theme="light"] [data-rehype-pretty-code-figure]>pre', {
  backgroundColor: 'var(--color-neutral-100)',
  borderColor: 'var(--color-divider)',
});

globalStyle('[data-theme="light"] [data-rehype-pretty-code-figure]>pre>code', {
  filter: 'brightness(0.85) contrast(1.1)',
});

globalStyle(
  "[data-theme='light'] [data-rehype-pretty-code-figure]>pre>code span[style*='color']",
  {
    filter: 'brightness(0.7) contrast(1.2)',
  }
);

globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: light)': {
      vars: {
        // This won't work for selectors. We need to nest selectors.
        // globalStyle has to be top-level selectors.
        // So we need distinct globalStyle calls for media queries if we target children.
      },
    },
  },
});
// Global styles inside media queries for specific selectors
globalStyle(
  '@media (prefers-color-scheme: light)',
  {
    // Vanilla Extract globalStyle doesn't support nesting unrelated selectors inside media query key directly?
    // Actually globalStyle first arg is selector.
    // To target [data-rehype-pretty-code-figure]>pre INSIDE media query:
    // We can't do globalStyle('@media...', { ... selector ... })
    // We must do globalStyle('selector', { '@media ...': { ... } })
  }
);

globalStyle(
  ':root:not([data-theme="dark"]) [data-rehype-pretty-code-figure]>pre',
  {
    '@media': {
      '(prefers-color-scheme: light)': {
        backgroundColor: 'var(--color-neutral-100)',
        borderColor: 'var(--color-divider)',
      },
    },
  }
);

globalStyle(
  ':root:not([data-theme="dark"]) [data-rehype-pretty-code-figure]>pre>code',
  {
    '@media': {
      '(prefers-color-scheme: light)': {
        filter: 'brightness(0.85) contrast(1.1)',
      },
    },
  }
);

globalStyle(
  ":root:not([data-theme='dark']) [data-rehype-pretty-code-figure]>pre>code span[style*='color']",
  {
    '@media': {
      '(prefers-color-scheme: light)': {
        filter: 'brightness(0.7) contrast(1.2)',
      },
    },
  }
);

// Copy Button
globalStyle("[data-slot='copy-button']", {
  position: 'absolute',
  top: 'var(--spacing-md)',
  right: 'var(--spacing-md)',
  zIndex: 10,
  width: 'var(--spacing-2xl)',
  height: 'var(--spacing-2xl)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  border: 'var(--border-width-thin) solid var(--color-border)',
  color: 'var(--color-text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  opacity: 0,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  outline: 'none',
});

globalStyle("[data-slot='copy-button']:focus-visible", {
  outline: 'var(--border-width-medium) solid var(--color-brand-primary)',
  outlineOffset: 'var(--spacing-xs)',
});

globalStyle("[data-rehype-pretty-code-figure]:hover [data-slot='copy-button']", {
  opacity: 1,
});

globalStyle("[data-slot='copy-button']:hover", {
  backgroundColor: 'var(--color-surface-hover)',
});

globalStyle("[data-slot='copy-button'] svg", {
  width: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
});

/* ============================================
   Badge Styles
   ============================================ */
globalStyle('.badge-container', {
  position: 'relative',
  display: 'inline-block',
});

globalStyle('.badge-count, .badge-dot', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 500,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease-in-out',
  boxSizing: 'border-box',
});

globalStyle('.badge-container .badge-count, .badge-container .badge-dot', {
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(50%, -50%)',
  zIndex: 10,
});

globalStyle('.badge-count.badge-small', {
  minWidth: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
  padding: '0 var(--spacing-xs)',
  borderRadius: '10px',
  fontSize: '0.625rem',
});

globalStyle('.badge-count.badge-medium', {
  minWidth: 'var(--spacing-lg)',
  height: 'var(--spacing-lg)',
  padding: '0 var(--spacing-md)',
  borderRadius: '10px',
  fontSize: 'var(--font-size-xs)',
});

globalStyle('.badge-count.badge-large', {
  minWidth: 'var(--spacing-xl)',
  height: 'var(--spacing-xl)',
  padding: '0 var(--spacing-sm)',
  borderRadius: '10px',
  fontSize: 'var(--font-size-sm)',
});

globalStyle('.badge-dot', {
  width: 'var(--spacing-sm) !important',
  height: 'var(--spacing-sm) !important',
  minWidth: '8px !important',
  maxWidth: '8px !important',
  padding: '0 !important',
  borderRadius: '50% !important',
  fontSize: '0 !important',
});

globalStyle('.badge-dot.badge-small', {
  width: '6px !important',
  height: '6px !important',
  minWidth: '6px !important',
  maxWidth: '6px !important',
});

globalStyle('.badge-dot.badge-medium', {
  width: '8px !important',
  height: '8px !important',
  minWidth: '8px !important',
  maxWidth: '8px !important',
});

globalStyle('.badge-dot.badge-large', {
  width: '10px !important',
  height: '10px !important',
  minWidth: '10px !important',
  maxWidth: '10px !important',
});

globalStyle('.badge-default', {
  backgroundColor: 'oklch(94% 0 0)',
  color: 'oklch(50% 0 0)',
  border: '1px solid oklch(85% 0 0)',
});

globalStyle('.badge-primary', {
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  border: '1px solid var(--color-brand-primary)',
});

globalStyle('.badge-success', {
  backgroundColor: 'var(--color-semantic-success)',
  color: 'var(--color-text-on-primary)',
  border: '1px solid var(--color-semantic-success)',
});

globalStyle('.badge-warning', {
  backgroundColor: 'var(--color-semantic-warning)',
  color: 'var(--color-text-on-primary)',
  border: '1px solid var(--color-semantic-warning)',
});

globalStyle('.badge-danger', {
  backgroundColor: 'var(--color-semantic-error)',
  color: 'var(--color-text-on-primary)',
  border: '1px solid var(--color-semantic-error)',
});

globalStyle('.badge-info', {
  backgroundColor: 'var(--color-semantic-info)',
  color: 'var(--color-text-on-primary)',
  border: '1px solid var(--color-semantic-info)',
});

globalStyle('.badge-processing', {
  animation: 'badge-processing 1.4s ease-in-out infinite both',
});

globalStyle(
  'span.badge-count:not(.badge-container .badge-count), span.badge-dot:not(.badge-container .badge-dot)',
  {
    position: 'static',
    transform: 'none',
  }
);
