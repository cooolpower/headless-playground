export const flipCountdownCss = `
:root{
  --hc-flip-bg: var(--color-surface);
  --hc-flip-border: var(--color-border);
  --hc-flip-text: var(--color-text-heading);
  --hc-flip-shadow: var(--shadow-lg);
  --hc-flip-radius: var(--radius-lg);
  --hc-flip-divider: var(--color-border);
  --hc-flip-ease: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.hcFlipRoot{ display:flex; flex-wrap:wrap; gap: var(--spacing-base); align-items:flex-start; }
.hcFlipUnit{ display:flex; flex-direction:column; align-items:center; gap: var(--spacing-xs); }
.hcFlipLabel{ font-size: var(--font-size-sm); color: var(--color-text-secondary); font-weight: 500; letter-spacing: .05em; text-transform: uppercase; }
.hcFlipDigits{ display:flex; gap: var(--spacing-xs); }

.hcFlipDigitContainer{
  --hc-digit-w: 4.375rem;
  --hc-digit-h: 5.625rem;
  --hc-digit-fs: var(--font-size-5xl);
  --hc-digit-top-shift: .45em;
  --hc-digit-bottom-shift: -.45em;
  width: var(--hc-digit-w);
  height: var(--hc-digit-h);
  position: relative;
  perspective: 300px;
  perspective-origin: center center;
}
.hcFlipDigitContainer[data-size="sm"]{ --hc-digit-w: 3.75rem; --hc-digit-h: 5.0rem; --hc-digit-fs: var(--font-size-4xl); --hc-digit-top-shift:.5em; --hc-digit-bottom-shift:-.5em; }
.hcFlipDigitContainer[data-size="md"]{ --hc-digit-w: 4.375rem; --hc-digit-h: 5.625rem; --hc-digit-fs: var(--font-size-5xl); }
.hcFlipDigitContainer[data-size="lg"]{ --hc-digit-w: 5.0rem; --hc-digit-h: 6.25rem; --hc-digit-fs: calc(var(--font-size-5xl) + 0.25rem); }
.hcFlipDigitContainer[data-size="xl"]{ --hc-digit-w: 5.5rem; --hc-digit-h: 6.75rem; --hc-digit-fs: calc(var(--font-size-5xl) + 0.5rem); }

.hcFlipDigit{
  position:relative;
  width:100%;
  height:100%;
  background: var(--hc-flip-bg);
  border: 1px solid var(--hc-flip-border);
  border-radius: var(--hc-flip-radius);
  box-shadow: var(--hc-flip-shadow);
  overflow:hidden;
  font-variant-numeric: tabular-nums;
}
.hcFlipDivider{
  position:absolute; top:50%; left:0; right:0; height:1px;
  background: var(--hc-flip-divider);
  z-index: 10;
  pointer-events:none;
}

.hcFlipTop, .hcFlipBottom, .hcFlipTopFlip, .hcFlipBottomFlip{
  position:absolute; left:0; right:0; height:50%;
  display:flex; align-items:center; justify-content:center;
  background: var(--hc-flip-bg);
  overflow:hidden;
  backface-visibility:hidden;
  transform-style: preserve-3d;
  will-change: transform;
}
.hcFlipTop{ top:0; z-index:1; transform-origin: bottom; }
.hcFlipBottom{ bottom:0; z-index:1; transform-origin: top; }
.hcFlipTopFlip{ top:0; z-index:4; transform-origin: bottom; }
.hcFlipBottomFlip{ bottom:0; z-index:4; transform-origin: top; transform: rotateX(90deg); }

.hcFlipValTop, .hcFlipValBottom{
  font-size: var(--hc-digit-fs);
  font-weight: 700;
  color: var(--hc-flip-text);
  line-height:1;
}
.hcFlipValTop{ transform: translateY(var(--hc-digit-top-shift)); }
.hcFlipValBottom{ transform: translateY(var(--hc-digit-bottom-shift)); }

@keyframes hcFlipTopAnim { 0%{ transform: rotateX(0deg);} 100%{ transform: rotateX(-90deg);} }
@keyframes hcFlipBottomAnim { 0%{ transform: rotateX(90deg);} 100%{ transform: rotateX(0deg);} }

.hcFlipTopFlipping{ animation: hcFlipTopAnim .4s var(--hc-flip-ease) forwards; }
.hcFlipBottomFlipping{ animation: hcFlipBottomAnim .4s var(--hc-flip-ease) forwards; }
`;

