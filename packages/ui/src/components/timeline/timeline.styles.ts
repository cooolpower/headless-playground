export const timelineCss = `
.hcTimeline {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  margin: 0;
}

.hcTimelineItem {
  position: relative;
  display: grid;
  grid-template-columns: 24px 1fr;
  column-gap: 16px;
  min-height: 2rem;
  padding-bottom: 24px;
}

.hcTimelineItem:last-child {
  padding-bottom: 0;
}

/* Tail (connecting line) */
.hcTimelineItemTail {
  position: absolute;
  left: 11px;
  top: 22px;
  bottom: -2px;
  width: 2px;
  background: var(--color-divider);
  border-radius: 1px;
}

/* Head (dot container) */
.hcTimelineItemHead {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* Default dot - Naive UI style (ring) */
.hcTimelineDot {
  width: 11px;
  height: 11px;
  border-radius: 9999px;
  border: 2px solid var(--color-brand-primary);
  background: var(--color-surface, #fff);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hcTimelineItem:hover .hcTimelineDot {
  transform: scale(1.2);
}

/* Color: default */
.hcTimelineItem[data-color="default"] .hcTimelineDot {
  border-color: var(--color-brand-primary);
}

/* Color: success / green */
.hcTimelineItem[data-color="success"] .hcTimelineDot,
.hcTimelineItem[data-color="green"] .hcTimelineDot {
  border-color: var(--color-semantic-success);
}
.hcTimelineItem[data-color="success"]:hover .hcTimelineDot,
.hcTimelineItem[data-color="green"]:hover .hcTimelineDot {
  box-shadow: 0 0 0 4px oklch(0.72 0.19 149.58 / 0.12);
}

/* Color: warning */
.hcTimelineItem[data-color="warning"] .hcTimelineDot {
  border-color: var(--color-semantic-warning);
}
.hcTimelineItem[data-color="warning"]:hover .hcTimelineDot {
  box-shadow: 0 0 0 4px oklch(0.80 0.15 71.7 / 0.12);
}

/* Color: error / red */
.hcTimelineItem[data-color="error"] .hcTimelineDot,
.hcTimelineItem[data-color="red"] .hcTimelineDot {
  border-color: var(--color-semantic-error);
}
.hcTimelineItem[data-color="error"]:hover .hcTimelineDot,
.hcTimelineItem[data-color="red"]:hover .hcTimelineDot {
  box-shadow: 0 0 0 4px oklch(0.63 0.21 22.0 / 0.12);
}

/* Color: info / blue */
.hcTimelineItem[data-color="info"] .hcTimelineDot,
.hcTimelineItem[data-color="blue"] .hcTimelineDot {
  border-color: var(--color-semantic-info);
}
.hcTimelineItem[data-color="info"]:hover .hcTimelineDot,
.hcTimelineItem[data-color="blue"]:hover .hcTimelineDot {
  box-shadow: 0 0 0 4px oklch(0.65 0.20 255.1 / 0.12);
}

/* Color: gray */
.hcTimelineItem[data-color="gray"] .hcTimelineDot {
  border-color: var(--color-text-muted);
}
.hcTimelineItem[data-color="gray"]:hover .hcTimelineDot {
  box-shadow: 0 0 0 4px oklch(50% 0 0 / 0.08);
}

/* Content area */
.hcTimelineItemContent {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 2px;
}

.hcTimelineItemLabel {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-heading);
  line-height: 1.4;
}

.hcTimelineItemDescription {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Right mode */
.hcTimeline[data-mode="right"] .hcTimelineItem {
  grid-template-columns: 1fr 24px;
}
.hcTimeline[data-mode="right"] .hcTimelineItemHead {
  grid-column: 2;
  grid-row: 1;
}
.hcTimeline[data-mode="right"] .hcTimelineItemContent {
  grid-column: 1;
  grid-row: 1;
  text-align: right;
}
.hcTimeline[data-mode="right"] .hcTimelineItemTail {
  left: auto;
  right: 11px;
}

/* Alternate mode */
.hcTimeline[data-mode="alternate"] .hcTimelineItem {
  grid-template-columns: 1fr 24px 1fr;
  column-gap: 16px;
}
.hcTimeline[data-mode="alternate"] .hcTimelineItemHead {
  grid-column: 2;
  grid-row: 1;
}
.hcTimeline[data-mode="alternate"] .hcTimelineItemTail {
  left: 50%;
  transform: translateX(-1px);
}
.hcTimeline[data-mode="alternate"] .hcTimelineItem[data-position="left"] .hcTimelineItemContent {
  grid-column: 1;
  grid-row: 1;
  text-align: right;
}
.hcTimeline[data-mode="alternate"] .hcTimelineItem[data-position="right"] .hcTimelineItemContent {
  grid-column: 3;
  grid-row: 1;
}

/* Animation */
@keyframes hcTimelineFadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hcTimelineItem {
  animation: hcTimelineFadeIn 0.35s ease-out both;
}

.hcTimelineItem:nth-child(1) { animation-delay: 0s; }
.hcTimelineItem:nth-child(2) { animation-delay: 0.06s; }
.hcTimelineItem:nth-child(3) { animation-delay: 0.12s; }
.hcTimelineItem:nth-child(4) { animation-delay: 0.18s; }
.hcTimelineItem:nth-child(5) { animation-delay: 0.24s; }
.hcTimelineItem:nth-child(6) { animation-delay: 0.30s; }
.hcTimelineItem:nth-child(7) { animation-delay: 0.36s; }
.hcTimelineItem:nth-child(8) { animation-delay: 0.42s; }
`;
