export const mentionCss = `
.hcMention{
  width: 100%;
}

.hcMentionInputWrap{
  position: relative;
}

.hcMentionHighlight{
  position: absolute;
  inset: 0;
  padding: var(--spacing-sm) var(--spacing-base);
  border: var(--border-width-thin) solid var(--color-divider);
  border-radius: var(--radius-md);
  pointer-events: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  font-family: inherit;
  overflow: auto;
  z-index: 1;
}

.hcMentionHighlightMention{
  background: var(--color-brand-primary);
  color: var(--color-text-on-primary);
  padding: 0 0.125rem;
  border-radius: var(--radius-xs);
}

.hcMentionHighlightText{
  color: transparent;
}

.hcMentionTextarea{
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 5rem;
  padding: var(--spacing-sm) var(--spacing-base);
  border: var(--border-width-thin) solid var(--color-divider);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  font-family: inherit;
  resize: vertical;
  outline: none;
  caret-color: var(--color-text);
}

.hcMention[data-disabled="true"] .hcMentionTextarea{
  cursor: not-allowed;
  opacity: 0.6;
}
.hcMention[data-disabled="false"] .hcMentionTextarea{
  cursor: text;
}

.hcMentionDropdown{
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: var(--border-width-thin) solid var(--color-divider);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  z-index: 1000;
  margin-top: var(--spacing-xs);
  max-height: 12.5rem;
  overflow-y: auto;
  box-shadow: var(--shadow-md);
}

.hcMentionStatus{
  padding: var(--spacing-sm) var(--spacing-base);
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.hcMentionOption{
  padding: var(--spacing-sm) var(--spacing-base);
  cursor: pointer;
  background: transparent;
  border-bottom: var(--border-width-thin) solid var(--color-divider);
}
.hcMentionOption:last-child{
  border-bottom: none;
}
.hcMentionOption:hover{
  background: var(--color-surface-hover);
}
.hcMentionOption[data-selected="true"]{
  background: var(--color-surface-hover);
}
`;

