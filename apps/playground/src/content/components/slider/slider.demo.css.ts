import { style, globalStyle } from '@vanilla-extract/css';

export const section = style({
  marginBottom: '32px',
});

export const content = style({
  padding: '24px',
  border: '1px solid oklch(90.0% 0.003 264.5)',
  borderRadius: '8px',
  backgroundColor: 'oklch(100.0% 0.000 0)',
});

export const status = style({
  marginTop: '16px',
  fontSize: '14px',
  color: 'oklch(55.1% 0.023 264.4)',
  marginBottom: 0,
});

export const completed = style({
  marginTop: '8px',
  fontSize: '14px',
  color: 'oklch(50.0% 0.150 264.5)',
  fontWeight: 500,
  marginBottom: 0,
});

export const sizeGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const sizeItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const sizeLabel = style({
  fontSize: '14px',
  fontWeight: 500,
  color: 'oklch(21.0% 0.032 264.7)',
  margin: 0,
});

export const controlGroup = style({
  display: 'flex',
  gap: '8px',
  marginTop: '16px',
});

export const button = style({
  padding: '6px 12px',
  border: '1px solid oklch(90.0% 0.003 264.5)',
  borderRadius: '4px',
  backgroundColor: 'oklch(100.0% 0.000 0)',
  color: 'oklch(21.0% 0.032 264.7)',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: 'oklch(98.5% 0.002 247.8)',
    borderColor: 'oklch(85.0% 0.010 264.5)',
  },
  ':active': {
    backgroundColor: 'oklch(96.0% 0.015 264.5)',
  },
});

// Slider 커스텀 스타일 (injectStyles=false일 때 사용)
const sliderCustomWrapper = style({});

globalStyle(`${sliderCustomWrapper} .hcSlider`, {
  position: 'relative',
  width: '100%',
  padding: 'var(--spacing-lg)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${sliderCustomWrapper} .hcSliderTrack`, {
  position: 'relative',
  width: '100%',
  height: 'var(--hc-slider-track-thickness)',
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-full)',
  cursor: 'pointer',
  border: '1px dashed var(--color-border)',
});

globalStyle(`${sliderCustomWrapper} .hcSliderFill`, {
  position: 'absolute',
  background: 'var(--hc-slider-fill)',
  borderRadius: 'var(--radius-full)',
  border: '1px solid var(--color-brand-primary)',
});

globalStyle(`${sliderCustomWrapper} .hcSliderHandle`, {
  width: 'var(--hc-slider-handle)',
  height: 'var(--hc-slider-handle)',
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-brand-primary)',
  borderRadius: '50%',
  cursor: 'grab',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  transition: 'box-shadow 0.2s',
});

export const sliderWrapperClass = sliderCustomWrapper;
