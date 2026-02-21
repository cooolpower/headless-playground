import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { vars } from '../styles/vars.css.ts';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(40px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const textReveal = keyframes({
  '0%': { backgroundPosition: '0% 50%' },
  '100%': { backgroundPosition: '100% 50%' },
});

const float = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-20px)' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${vars.spacing.xl}`,
  gap: vars.spacing['7xl'],
  position: 'relative',
});

// Glow Effects
export const glow = style({
  position: 'absolute',
  top: '-10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '800px',
  height: '400px',
  background: 'radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)',
  opacity: 0.15,
  filter: 'blur(100px)',
  pointerEvents: 'none',
  zIndex: -1,
});

// Hero Section
export const hero = style({
  paddingTop: vars.spacing['6xl'],
  paddingBottom: vars.spacing['4xl'],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  animation: `${fadeIn} 1.2s cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const heroBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.xs} ${vars.spacing.md}`,
  borderRadius: vars.radius.full,
  backgroundColor: 'var(--color-surface)',
  border: `1px solid var(--color-border)`,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: 'var(--color-text-secondary)',
  marginBottom: vars.spacing.xl,
  transition: 'all 0.3s ease',
  ':hover': {
    borderColor: 'var(--color-brand-primary)',
    transform: 'translateY(-2px)',
  },
});

export const heroTitle = style({
  fontSize: 'clamp(3.5rem, 10vw, 6rem)',
  fontWeight: vars.fontWeight.bold,
  lineHeight: 0.9,
  letterSpacing: '-0.04em',
  color: 'var(--color-text-heading)',
  marginBottom: vars.spacing.xl,
  maxWidth: '1000px',
});

export const gradientText = style({
  background: 'linear-gradient(90deg, #5EEAD4, #3B82F6, #8B5CF6, #5EEAD4)',
  backgroundSize: '300% 100%',
  animation: `${textReveal} 8s linear infinite`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const heroDescription = style({
  fontSize: vars.fontSize.xl,
  color: 'var(--color-text-secondary)',
  maxWidth: '700px',
  lineHeight: 1.5,
  marginBottom: vars.spacing['2xl'],
});

export const btnGroup = style({
  display: 'flex',
  gap: vars.spacing.base,
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const primaryBtn = style({
  height: '52px',
  padding: `0 ${vars.spacing['2xl']}`,
  backgroundColor: 'var(--color-text-heading)',
  color: 'var(--color-background)',
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  ':hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 20px 40px oklch(0% 0 0 / 0.2)',
  },
});

export const secondaryBtn = style({
  height: '52px',
  padding: `0 ${vars.spacing['2xl']}`,
  backgroundColor: 'var(--color-surface)',
  border: `1px solid var(--color-border)`,
  color: 'var(--color-text-heading)',
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-text-secondary)',
  },
});

// Interactive Showcase Section
export const showcaseSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['4xl'],
});

export const sectionHeader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: vars.spacing.md,
});

export const label = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: 'var(--color-brand-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
});

export const showcaseTitle = style({
  fontSize: vars.fontSize['4xl'],
  fontWeight: vars.fontWeight.bold,
  color: 'var(--color-text-heading)',
});

export const showcaseGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: vars.spacing.xl,
});

// Bento style items with different sizes
export const gridItem = style({
  background: 'var(--color-surface)',
  borderRadius: vars.radius.xl,
  padding: vars.spacing['2xl'],
  border: `1px solid var(--color-border)`,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  ':hover': {
    borderColor: 'var(--color-brand-primary)',
    boxShadow: `inset 0 0 0 1px var(--color-brand-primary), ${vars.shadow.xl}`,
    transform: 'translateY(-8px)',
  },
});

export const itemLarge = style([gridItem, { gridColumn: 'span 8', minHeight: '400px' }]);
export const itemMedium = style([gridItem, { gridColumn: 'span 4', minHeight: '400px' }]);
export const itemSmall = style([gridItem, { gridColumn: 'span 4', minHeight: '300px' }]);

export const visualArea = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, oklch(100% 0 0 / 0.03) 0%, oklch(100% 0 0 / 0.01) 100%)',
  borderRadius: vars.radius.lg,
  marginBottom: vars.spacing.xl,
  padding: vars.spacing.xl,
  position: 'relative',
  overflow: 'hidden',
});

export const cardInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
});

export const cardHeading = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.bold,
  color: 'var(--color-text-heading)',
});

export const cardSub = style({
  fontSize: vars.fontSize.sm,
  color: 'var(--color-text-secondary)',
  lineHeight: 1.5,
});

// Component Directory Section
export const directoryGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
  gap: vars.spacing.sm,
  marginTop: vars.spacing.xl,
});

export const directoryItem = style({
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  backgroundColor: 'var(--color-surface)',
  border: `1px solid var(--color-border)`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  color: 'var(--color-text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'var(--color-background)',
    borderColor: 'var(--color-brand-primary)',
    color: 'var(--color-brand-primary)',
    transform: 'translateX(4px)',
  },
});

export const dot = style({
  width: '6px',
  height: '6px',
  borderRadius: vars.radius.full,
  backgroundColor: 'var(--color-border)',
  transition: 'all 0.2s ease',
  selectors: {
    [`${directoryItem}:hover &`]: {
      backgroundColor: 'var(--color-brand-primary)',
      boxShadow: '0 0 8px var(--color-brand-primary)',
    },
  },
});

// Code Preview Section
export const codeSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xl,
  background: 'var(--color-surface)',
  borderRadius: vars.radius['2xl'],
  border: `1px solid var(--color-border)`,
  padding: vars.spacing['2xl'],
  overflow: 'hidden',
  position: 'relative',
});

export const codeHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  marginBottom: vars.spacing.md,
});

export const codeDot = style({
  width: '12px',
  height: '12px',
  borderRadius: vars.radius.full,
  backgroundColor: 'var(--color-border)',
});

export const codeContent = style({
  fontFamily: vars.fontFamily.mono,
  fontSize: vars.fontSize.md,
  lineHeight: 1.6,
  color: 'var(--color-text)',
  whiteSpace: 'pre-wrap',
});

export const syntaxKeyword = style({ color: '#8B5CF6' });
export const syntaxComponent = style({ color: '#3B82F6' });
export const syntaxProp = style({ color: '#5EEAD4' });
export const syntaxString = style({ color: '#10B981' });

// Footer Badge
export const footerCTA = style({
  marginTop: vars.spacing['4xl'],
  padding: vars.spacing['4xl'],
  borderRadius: vars.radius['3xl'],
  background: 'linear-gradient(to right, var(--color-brand-primary), #60a5fa)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  color: 'white',
  gap: vars.spacing.xl,
});
