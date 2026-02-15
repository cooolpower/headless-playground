export const timelineCss = `
.hcTimeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hcTimelineItem {
  position: relative;
  display: grid;
  grid-template-columns: 1.25rem 1fr;
  column-gap: 0.75rem;
  min-height: 1.5rem;
}

.hcTimelineItemHead {
  position: relative;
  width: 1.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.hcTimelineDot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 9999px;
  background: var(--color-brand-primary);
}

.hcTimelineItem[data-color="green"] .hcTimelineDot {
  background: var(--color-semantic-success);
}
.hcTimelineItem[data-color="red"] .hcTimelineDot {
  background: var(--color-semantic-error);
}
.hcTimelineItem[data-color="gray"] .hcTimelineDot {
  background: var(--color-text-muted);
}
.hcTimelineItem[data-color="blue"] .hcTimelineDot {
  background: var(--color-semantic-info);
}

.hcTimelineItemTail {
  position: absolute;
  left: 0.59375rem; /* center of 1.25rem column */
  top: 0.875rem;
  bottom: -1rem;
  width: 1px;
  background: var(--color-divider);
}

.hcTimelineItemContent {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.0625rem;
}

.hcTimelineItemLabel {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-heading);
}

.hcTimelineItemDescription {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

/* Mode: right */
.hcTimeline[data-mode="right"] .hcTimelineItem {
  grid-template-columns: 1fr 1.25rem;
}
.hcTimeline[data-mode="right"] .hcTimelineItemHead {
  grid-column: 2;
}
.hcTimeline[data-mode="right"] .hcTimelineItemContent {
  grid-column: 1;
  text-align: right;
}
.hcTimeline[data-mode="right"] .hcTimelineItemTail {
  left: auto;
  right: 0.59375rem;
}

/* Mode: alternate (simple parity-based) */
.hcTimeline[data-mode="alternate"] .hcTimelineItem[data-position="right"] {
  grid-template-columns: 1fr 1.25rem;
}
.hcTimeline[data-mode="alternate"] .hcTimelineItem[data-position="right"] .hcTimelineItemHead {
  grid-column: 2;
}
.hcTimeline[data-mode="alternate"] .hcTimelineItem[data-position="right"] .hcTimelineItemContent {
  grid-column: 1;
  text-align: right;
}
.hcTimeline[data-mode="alternate"] .hcTimelineItem[data-position="right"] .hcTimelineItemTail {
  left: auto;
  right: 0.59375rem;
}
`;

