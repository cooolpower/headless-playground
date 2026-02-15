export const progressCss = `
.hcProgress{
  --hc-progress-stroke: var(--color-semantic-info);
  --hc-progress-trail: var(--color-surface);
  color: var(--hc-progress-stroke);
}

.hcProgressLineOuter{
  width: 100%;
  border-radius: 9999px;
  overflow: hidden;
  background: var(--hc-progress-trail);
  position: relative;
}

.hcProgress[data-size="small"] .hcProgressLineOuter{ height: var(--size-sm); }
.hcProgress[data-size="medium"] .hcProgressLineOuter{ height: var(--size-md); }
.hcProgress[data-size="large"] .hcProgressLineOuter{ height: var(-size-base); }

.hcProgressLineInner{
  height: 10px;
  background: var(--hc-progress-stroke);
  border-radius: 9999px;
  transition: width 0.3s ease;
}
.hcProgress[data-size="small"] .hcProgressLineInner{ height: var(--size-sm); }
.hcProgress[data-size="medium"] .hcProgressLineInner{ height: var(--size-md); }
.hcProgress[data-size="large"] .hcProgressLineInner{ height: var(-size-base); }

.hcProgressLineText{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  z-index: 1;
  text-shadow: 0 0 2px var(--color-surface);
  pointer-events: none;
}

.hcProgress[data-size="small"] .hcProgressLineText{ font-size: var(--font-size-xs); }
.hcProgress[data-size="medium"] .hcProgressLineText{ font-size: var(--font-size-sm); }
.hcProgress[data-size="large"] .hcProgressLineText{ font-size: var(--font-size-md); }

.hcProgressCircleSvg{
  transform: rotate(-90deg);
  overflow: visible;
  display: block;
}

.hcProgressCircleTrail{
  fill: none;
  stroke: var(--hc-progress-trail);
}

.hcProgressCircleBar{
  fill: none;
  stroke: var(--hc-progress-stroke);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease, stroke 0.3s ease;
}

.hcProgressCircleText{
  fill: var(--color-text);
  font-weight: var(--font-weight-medium);
}
`;

