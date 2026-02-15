export const descriptionsCss = `
.hcDescriptions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--color-text);
}

.hcDescriptionsTitle {
  font-weight: 700;
  color: var(--color-text-heading);
}

.hcDescriptionsList {
  display: grid;
  gap: 0.75rem;
}

.hcDescriptionsItem {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.hcDescriptionsLabel {
  color: var(--color-text-secondary);
  font-weight: 600;
}

.hcDescriptionsValue {
  color: var(--color-text);
  min-width: 0;
}

/* Layout */
.hcDescriptions[data-layout="vertical"] .hcDescriptionsItem {
  flex-direction: column;
  gap: 0.25rem;
}

/* Sizes */
.hcDescriptions[data-size="small"] {
  font-size: 0.875rem;
}
.hcDescriptions[data-size="medium"] {
  font-size: 1rem;
}
.hcDescriptions[data-size="large"] {
  font-size: 1.125rem;
}

/* Bordered */
.hcDescriptions[data-bordered="true"] .hcDescriptionsList {
  gap: 0;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.hcDescriptions[data-bordered="true"] .hcDescriptionsItem {
  padding: 0.75rem;
  border-top: 1px solid var(--color-divider);
}
.hcDescriptions[data-bordered="true"] .hcDescriptionsItem:nth-child(-n+1) {
  border-top: none;
}
`;

