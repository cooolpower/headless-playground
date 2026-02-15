import { style, keyframes, globalStyle } from '@vanilla-extract/css';

// Animation keyframes
const rainbowShift = keyframes({
  '0%': { backgroundPosition: '0% 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' },
});

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const demoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
  padding: 'var(--spacing-lg)',
});

export const demoTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-demo-title)',
  margin: 0,
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const gradientWrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-base)',
});

export const gradientItem = style({
  padding: 'var(--spacing-base)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '200px',
  minHeight: '60px',
});

// Linear Gradients - Using design system colors
export const linearRainbow = style({
  background:
    'linear-gradient(45deg, var(--color-semantic-error), var(--color-semantic-warning), var(--color-brand-primary), var(--color-semantic-info))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

export const linearSunset = style({
  background: 'linear-gradient(45deg, var(--color-semantic-error), var(--color-semantic-warning), var(--color-semantic-warning-hover))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

export const linearOcean = style({
  background: 'linear-gradient(45deg, var(--color-semantic-info), var(--color-semantic-info-hover), var(--color-brand-primary))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

export const linearForest = style({
  background: 'linear-gradient(45deg, var(--color-brand-primary), var(--color-brand-primary-hover), var(--color-semantic-success))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

// Radial Gradients - Using design system colors
export const radialWarm = style({
  background: 'radial-gradient(circle, var(--color-semantic-error), var(--color-semantic-warning))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

export const radialCool = style({
  background: 'radial-gradient(circle, var(--color-semantic-info), var(--color-brand-primary))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

export const radialPurple = style({
  background: 'radial-gradient(circle, var(--color-brand-primary), var(--color-semantic-info))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

// Text Sizes
export const small = style({
  fontSize: 'var(--font-size-base)',
});

export const medium = style({
  fontSize: 'var(--font-size-2xl)',
});

export const large = style({
  fontSize: '32px',
});

export const extraLarge = style({
  fontSize: '48px',
});

// Animated Gradients - Using design system colors
export const animatedRainbow = style({
  background:
    'linear-gradient(-45deg, var(--color-semantic-error), var(--color-semantic-warning), var(--color-brand-primary), var(--color-semantic-info), var(--color-semantic-error))',
  backgroundSize: '400% 400%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${rainbowShift} 3s ease infinite`,
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

export const animatedShimmer = style({
  background:
    'linear-gradient(90deg, var(--color-semantic-info), var(--color-brand-primary), var(--color-semantic-info))',
  backgroundSize: '200% 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${shimmer} 2s infinite`,
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'bold',
});

export const sizeWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
  alignItems: 'flex-start',
});

export const backgroundWrapper = style({
  padding: 'var(--spacing-base)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-divider)',
});

export const normalText = style({
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-text-muted)',
  lineHeight: '1.6',
  margin: 0,
});

export const inlineGradient = style({
  background: 'linear-gradient(45deg, var(--color-semantic-info), var(--color-brand-primary))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: '600',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-card-padding)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-background)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.5',
  margin: 0,
});

// GradientText 커스텀 스타일 (injectStyles=false일 때 사용)
const gradientTextCustomWrapper = style({});

globalStyle(`${gradientTextCustomWrapper} .hcGradientText`, {
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundColor: 'transparent',
  padding: 'var(--spacing-sm)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'linear-gradient(45deg, var(--color-semantic-info), var(--color-brand-primary))',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${gradientTextCustomWrapper} .hcGradientText[data-type="radial"]`, {
  background: 'radial-gradient(circle, var(--color-semantic-info), var(--color-brand-primary))',
});

export const gradientTextWrapperClass = gradientTextCustomWrapper;
