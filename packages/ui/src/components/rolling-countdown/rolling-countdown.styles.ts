export const rollingCountdownCss = `
:root {
  --hc-rolling-text: var(--color-text-heading);
  --hc-rolling-duration: 0.4s;
  --hc-rolling-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

.hcRollingRoot {
  display: inline-flex;
  align-items: center;
  gap: 0;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.hcRollingRoot[data-size="sm"] { font-size: 1.5rem; }
.hcRollingRoot[data-size="md"] { font-size: 2.5rem; }
.hcRollingRoot[data-size="lg"] { font-size: 3.5rem; }
.hcRollingRoot[data-size="xl"] { font-size: 5rem; }

.hcRollingDigitContainer {
  display: inline-block;
  width: 0.65em;
  height: 1em;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.hcRollingDigitList {
  position: absolute;
  top: 0; left: 0; right: 0;
  transition: transform var(--hc-rolling-duration) var(--hc-rolling-ease);
  will-change: transform;
}

.hcRollingDigit {
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--hc-rolling-text);
  line-height: 1;
}

.hcRollingSeparator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.4em;
  color: var(--color-text-secondary);
  opacity: 0.6;
  font-weight: 400;
}
`;
