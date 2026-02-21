export const flipCountdownCss = `
:root{
  --hc-flip-bg: var(--color-surface);
  --hc-flip-border: var(--color-border);
  --hc-flip-text: var(--color-text-heading);
  --hc-flip-shadow: 0 10px 30px -10px oklch(0% 0 0 / 0.5);
  --hc-flip-radius: var(--radius-md);
  --hc-flip-divider: oklch(0% 0 0 / 0.3);
  --hc-flip-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --hc-flip-duration: 0.6s;
}

.hcFlipRoot{ display:flex; flex-wrap:wrap; gap: var(--spacing-base); align-items:flex-start; }
.hcFlipUnit{ display:flex; flex-direction:column; align-items:center; gap: var(--spacing-xs); }
.hcFlipLabel{ font-size: var(--font-size-xs); color: var(--color-text-secondary); font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
.hcFlipDigits{ display:flex; gap: 4px; }

.hcFlipDigitContainer{
  --hc-digit-w: 4.5rem;
  --hc-digit-h: 6.0rem;
  --hc-digit-fs: 3.5rem;
  --hc-digit-top-shift: .42em;
  --hc-digit-bottom-shift: -.42em;
  width: var(--hc-digit-w);
  height: var(--hc-digit-h);
  position: relative;
  perspective: 1000px;
}
.hcFlipDigitContainer[data-size="sm"]{ --hc-digit-w: 3.5rem; --hc-digit-h: 4.8rem; --hc-digit-fs: 2.5rem; --hc-digit-top-shift:.42em; --hc-digit-bottom-shift:-.42em; }
.hcFlipDigitContainer[data-size="md"]{ --hc-digit-w: 4.5rem; --hc-digit-h: 6.0rem; --hc-digit-fs: 3.5rem; }
.hcFlipDigitContainer[data-size="lg"]{ --hc-digit-w: 5.5rem; --hc-digit-h: 7.2rem; --hc-digit-fs: 4.5rem; }
.hcFlipDigitContainer[data-size="xl"]{ --hc-digit-w: 6.5rem; --hc-digit-h: 8.4rem; --hc-digit-fs: 5.5rem; }

.hcFlipDigit{
  position:relative;
  width:100%;
  height:100%;
  background: var(--hc-flip-bg);
  border-radius: var(--hc-flip-radius);
  box-shadow: var(--hc-flip-shadow);
  overflow:visible;
  font-variant-numeric: tabular-nums;
  user-select: none;
}
.hcFlipDivider{
  position:absolute; top:calc(50% - 0.5px); left:0; right:0; height:1px;
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
  will-change: transform;
}

.hcFlipTop, .hcFlipTopFlip {
  top:0;
  border-radius: var(--hc-flip-radius) var(--hc-flip-radius) 0 0;
  background-image: linear-gradient(oklch(100% 0 0 / 0.05), oklch(0% 0 0 / 0.05));
  border: 1px solid var(--hc-flip-border);
  border-bottom: none;
}

.hcFlipBottom, .hcFlipBottomFlip {
  bottom:0;
  border-radius: 0 0 var(--hc-flip-radius) var(--hc-flip-radius);
  background-image: linear-gradient(oklch(0% 0 0 / 0.05), oklch(100% 0 0 / 0.05));
  border: 1px solid var(--hc-flip-border);
  border-top: none;
}

.hcFlipTop{ z-index:1; }
.hcFlipBottom{ z-index:1; }
.hcFlipTopFlip{ z-index:4; transform-origin: bottom; }
.hcFlipBottomFlip{ z-index:4; transform-origin: top; transform: rotateX(90deg); }

.hcFlipValTop, .hcFlipValBottom{
  font-size: var(--hc-digit-fs);
  font-weight: 800;
  color: var(--hc-flip-text);
  line-height:1;
}
.hcFlipValTop{ transform: translateY(var(--hc-digit-top-shift)); }
.hcFlipValBottom{ transform: translateY(var(--hc-digit-bottom-shift)); }

@keyframes hcFlipTopAnim {
  0%{ transform: rotateX(0deg); filter: brightness(1); }
  100%{ transform: rotateX(-90deg); filter: brightness(0.5); }
}
@keyframes hcFlipBottomAnim {
  0%{ transform: rotateX(90deg); filter: brightness(0.5); }
  100%{ transform: rotateX(0deg); filter: brightness(1); }
}

.hcFlipTopFlipping{ animation: hcFlipTopAnim var(--hc-flip-duration) var(--hc-flip-ease) forwards; }
.hcFlipBottomFlipping{ animation: hcFlipBottomAnim var(--hc-flip-duration) var(--hc-flip-ease) forwards; }
`;

