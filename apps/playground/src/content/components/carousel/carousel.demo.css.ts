import { style, globalStyle } from '@vanilla-extract/css';

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

export const carouselWrapper = style({
  position: 'relative',
  width: '100%',
  maxWidth: '500px',
});

export const carouselContainer = style({
  position: 'relative',
  width: '100%',
  height: '300px',
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow: 'var(--shadow-sm)',
});

export const carouselTrack = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  transition: 'transform 0.3s ease',
});

// Card 예제용 컨테이너 (높이가 컨텐츠에 맞춰짐)
export const carouselContainerCards = style({
  position: 'relative',
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow: 'var(--shadow-sm)',
});

// Card 예제용 트랙 (높이가 컨텐츠에 맞춰짐)
export const carouselTrackCards = style({
  display: 'flex',
  width: '100%',
  transition: 'transform 0.3s ease',
});

// Card 예제의 각 카드는 flex: 0 0 100%로 슬라이드되며, 높이는 컨텐츠에 맞춰짐
globalStyle(`${carouselTrackCards} > *`, {
  flex: '0 0 100%',
  width: '100%',
  boxSizing: 'border-box',
  flexShrink: 0,
});

export const slide = style({
  flex: '0 0 100%',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  boxSizing: 'border-box',
});

export const slideTitle = style({
  margin: '0 0 8px 0',
  fontSize: 'var(--font-size-2xl)',
});

export const slideText = style({
  margin: 0,
  fontSize: 'var(--font-size-sm)',
  opacity: 0.9,
});

export const navButton = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40px',
  height: '40px',
  backgroundColor: 'var(--color-surface)',
  opacity: 0.8,
  border: 'none',
  borderRadius: '50%',
  color: 'var(--color-text-muted)',
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  zIndex: 10,

  ':hover': {
    backgroundColor: 'var(--color-surface)',
    boxShadow: 'var(--shadow-md)',
  },

  selectors: {
    '&:first-of-type': {
      left: '10px',
    },
    '&:last-of-type': {
      right: '10px',
    },
  },
});

export const indicators = style({
  display: 'flex',
  justifyContent: 'center',
  gap: 'var(--spacing-sm)',
  marginTop: '16px',
});

export const indicator = style({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'var(--color-divider)',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: 'var(--color-text-secondary)',
  },
});

export const active = style({
  backgroundColor: 'var(--color-brand-primary)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
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

// Carousel component styles (moved from headless component)
export const carousel = style({
  padding: '1rem',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
});

// Carousel 커스텀 스타일 (injectStyles=false일 때 사용)
const carouselCustomWrapper = style({});

globalStyle(`${carouselCustomWrapper} .hcCarousel`, {
  display: 'block',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${carouselCustomWrapper} .hcCarousel[data-disabled="true"]`, {
  opacity: 0.5,
  pointerEvents: 'none',
});

export const carouselWrapperClass = carouselCustomWrapper;
