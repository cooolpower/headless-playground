import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

export const prose = style({
  width: '100%',
  maxWidth: '800px', // 최적의 가독성을 위한 너비 제한
  color: vars.color.text,
  fontSize: vars.fontSize.base,
  lineHeight: 1.7,
  wordWrap: 'break-word',
});

// Headings
globalStyle(`${prose} h1`, {
  fontSize: vars.fontSize['4xl'],
  fontWeight: vars.fontWeight.bold,
  letterSpacing: '-0.02em',
  //marginTop: vars.spacing['4xl'],
  marginBottom: vars.spacing.lg,
  color: vars.color.text,
});

globalStyle(`${prose} h2`, {
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.semibold,
  letterSpacing: '-0.015em',
  marginTop: vars.spacing['3xl'],
  marginBottom: vars.spacing.md,
  paddingBottom: vars.spacing.xs,
  borderBottom: `1px solid ${vars.color.border}`,
  color: vars.color.text,
});

globalStyle(`${prose} h3`, {
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.semibold,
  letterSpacing: '-0.01em',
  marginTop: vars.spacing['2xl'],
  marginBottom: vars.spacing.sm,
  color: vars.color.text,
});

// Paragraphs
globalStyle(`${prose} p`, {
  marginTop: vars.spacing.base,
  marginBottom: vars.spacing.base,
  color: vars.color['text-secondary'], // Muted 느낌으로 가독성 향상
  lineHeight: 1.7,
});

// Strong / B
globalStyle(`${prose} strong, ${prose} b`, {
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.text,
});

// Links
globalStyle(`${prose} a`, {
  color: vars.color['brand-primary'],
  textDecoration: 'none',
  fontWeight: vars.fontWeight.medium,
  transition: 'color 0.2s',
});
globalStyle(`${prose} a:hover`, {
  textDecoration: 'underline',
  color: vars.color['brand-primary-hover'],
});

// Inline Code
globalStyle(`${prose} code:not(pre code)`, {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '0.875em',
  backgroundColor: vars.color.background, // 기존 bg.subtle 대신 background 혹은 neutral 토큰 사용
  padding: '0.2em 0.4em',
  borderRadius: vars.radius.md,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
});

// Preformatted Text (Code Blocks)
globalStyle(`${prose} pre`, {
  backgroundColor: '#0d1117', // Github Dark 느낌의 모던한 다크 코드블럭
  color: '#c9d1d9',
  padding: vars.spacing.xl,
  borderRadius: vars.radius.lg,
  overflowX: 'auto',
  marginTop: vars.spacing.lg,
  marginBottom: vars.spacing.lg,
  fontSize: '0.875em',
  border: `1px solid #30363d`, // 고정된 다크 테마 보더
  lineHeight: 1.5,
});
globalStyle(`${prose} pre code`, {
  backgroundColor: 'transparent',
  padding: 0,
  borderRadius: 0,
  color: 'inherit',
  border: 'none',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
});

// Lists
globalStyle(`${prose} ul, ${prose} ol`, {
  marginTop: vars.spacing.base,
  marginBottom: vars.spacing.base,
  paddingLeft: vars.spacing['2xl'],
  color: vars.color['text-secondary'],
});
globalStyle(`${prose} li`, {
  marginTop: vars.spacing.xs,
  marginBottom: vars.spacing.xs,
});
globalStyle(`${prose} li::marker`, {
  color: vars.color['text-muted'],
});

// Blockquote
globalStyle(`${prose} blockquote`, {
  marginTop: vars.spacing.xl,
  marginBottom: vars.spacing.xl,
  paddingLeft: vars.spacing.lg,
  borderLeft: `4px solid ${vars.color.border}`,
  color: vars.color['text-muted'],
  fontStyle: 'italic',
});

// Horizontal Rule
globalStyle(`${prose} hr`, {
  height: '1px',
  border: 'none',
  backgroundColor: vars.color.border,
  marginTop: vars.spacing['3xl'],
  marginBottom: vars.spacing['3xl'],
});
