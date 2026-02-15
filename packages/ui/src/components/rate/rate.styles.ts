export const rateCss = `
.hcRate {
  display: inline-flex;
  align-items: center;
  font-size: var(--font-size-xl);
  cursor: pointer;
  user-select: none;
}

.hcRate[data-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.5;
}

.hcRateStarWrapper {
  position: relative;
  display: inline-block;
  line-height: 1;
  cursor: pointer;
}

.hcRate[data-disabled="true"] .hcRateStarWrapper {
  cursor: not-allowed;
}

.hcRateStar {
  display: inline-block;
  color: var(--color-divider);
  transition: color 0.2s ease-in-out;
  position: relative;
  z-index: 1;
}

.hcRateStar[data-active="true"] {
  color: var(--color-semantic-warning);
}

.hcRateStarHalf {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  overflow: hidden;
  color: var(--color-semantic-warning);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.hcRateStarHalf[data-half-active="true"] {
  opacity: 1;
}
`;

