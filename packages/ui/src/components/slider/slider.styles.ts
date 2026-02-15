export const sliderCss = `
:root{
  --hc-slider-rail: var(--color-border);
  --hc-slider-fill: var(--color-semantic-info);
  --hc-slider-handle-bg: var(--color-surface);
  --hc-slider-handle-border: var(--color-semantic-info);
  --hc-slider-handle-border-disabled: var(--color-text-disabled);
  --hc-slider-handle-shadow: var(--shadow-sm);
  --hc-slider-handle-shadow-active: var(--shadow-lg);
  --hc-slider-mark: var(--color-text-secondary);
  --hc-slider-tooltip-bg: var(--color-text-heading);
  --hc-slider-tooltip-text: var(--color-surface);
}

.hcSlider{
  position: relative;
  width: 100%;
}
.hcSlider[data-vertical="true"]{
  width: auto;
  height: 100%;
}

.hcSlider[data-size="small"]{
  --hc-slider-track-thickness: 0.25rem;
  --hc-slider-mark-size: 0.25rem;
  --hc-slider-handle: 1rem;
}
.hcSlider[data-size="medium"]{
  --hc-slider-track-thickness: 0.375rem;
  --hc-slider-mark-size: 0.375rem;
  --hc-slider-handle: 1.25rem;
}
.hcSlider[data-size="large"]{
  --hc-slider-track-thickness: 0.5rem;
  --hc-slider-mark-size: 0.5rem;
  --hc-slider-handle: 1.5rem;
}

.hcSlider{
  padding: var(--hc-slider-handle) 0;
}
.hcSlider[data-vertical="true"]{
  padding: 0 var(--hc-slider-handle);
}

.hcSliderTrack{
  position: relative;
  width: 100%;
  height: var(--hc-slider-track-thickness);
  background: var(--color-surface);
  border-radius: var(--radius-full);
  cursor: pointer;
}
.hcSlider[data-vertical="true"] .hcSliderTrack{
  width: var(--hc-slider-mark-size);
  height: 100%;
}
.hcSlider[data-disabled="true"] .hcSliderTrack{
  cursor: not-allowed;
}

.hcSliderFill{
  position: absolute;
  background: var(--hc-slider-fill);
  border-radius: var(--radius-full);
}

.hcSliderHandleWrap{
  position: absolute;
  z-index: 2;
}

.hcSliderHandle{
  width: var(--hc-slider-handle);
  height: var(--hc-slider-handle);
  background: var(--hc-slider-handle-bg);
  border: var(--border-width-medium) solid var(--hc-slider-handle-border);
  border-radius: 50%;
  cursor: grab;
  box-shadow: var(--hc-slider-handle-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: box-shadow 0.2s;
}
.hcSlider[data-disabled="true"] .hcSliderHandle{
  border-color: var(--hc-slider-handle-border-disabled);
  cursor: not-allowed;
}
.hcSlider[data-dragging="true"] .hcSliderHandle[data-active="true"]{
  cursor: grabbing;
  box-shadow: var(--hc-slider-handle-shadow-active);
}

.hcSliderHandleIcon{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--hc-slider-handle-border);
}

.hcSliderTooltip{
  position: absolute;
  padding: var(--spacing-xs) var(--spacing-tight);
  background: var(--hc-slider-tooltip-bg);
  color: var(--hc-slider-tooltip-text);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
}
.hcSliderTooltipArrow{
  position: absolute;
  width: 0;
  height: 0;
}
.hcSliderTooltip[data-vertical="true"] .hcSliderTooltipArrow{
  right: -0.25rem;
  top: 50%;
  transform: translateY(-50%);
  border-top: 0.25rem solid transparent;
  border-bottom: 0.25rem solid transparent;
  border-right: 0.25rem solid var(--hc-slider-tooltip-bg);
}
.hcSliderTooltip[data-vertical="false"] .hcSliderTooltipArrow{
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 0.25rem solid transparent;
  border-right: 0.25rem solid transparent;
  border-top: 0.25rem solid var(--hc-slider-tooltip-bg);
}

.hcSliderMarkDot{
  position: absolute;
  width: var(--hc-slider-mark-size);
  height: var(--hc-slider-mark-size);
  background: var(--hc-slider-mark);
  border-radius: 50%;
  z-index: 1;
}
.hcSliderMarkLabel{
  position: absolute;
  font-size: var(--font-size-xs);
  color: var(--hc-slider-mark);
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

