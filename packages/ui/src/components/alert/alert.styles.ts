export const alertCss = `
.hcAlert {
  --hc-alert-bg: var(--color-semantic-info, #e3f2fd);
  --hc-alert-border: var(--color-semantic-info-hover, #90caf9);
  --hc-alert-text: var(--color-text-on-info, #0d47a1);
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-base, 8px);
  line-height: 1.5;
}

.hcAlert[data-type="success"] {
  --hc-alert-bg: var(--color-semantic-success, #e8f5e9);
  --hc-alert-border: var(--color-semantic-success-hover, #a5d6a7);
  --hc-alert-text: var(--color-text-on-success, #1b5e20);
}
.hcAlert[data-type="error"] {
  --hc-alert-bg: var(--color-semantic-error, #ffebee);
  --hc-alert-border: var(--color-semantic-error-hover, #ef9a9a);
  --hc-alert-text: var(--color-text-on-error, #b71c1c);
}
.hcAlert[data-type="warning"] {
  --hc-alert-bg: var(--color-semantic-warning, #fff3e0);
  --hc-alert-border: var(--color-semantic-warning-hover, #ffcc80);
  --hc-alert-text: var(--color-text-on-warning, #e65100);
}
.hcAlert[data-type="info"] {
  --hc-alert-bg: var(--color-semantic-info, #e3f2fd);
  --hc-alert-border: var(--color-semantic-info-hover, #90caf9);
  --hc-alert-text: var(--color-text-on-info, #0d47a1);
}

.hcAlert[data-banner="true"] {
  width: 100%;
  padding: var(--spacing-base, 8px) var(--spacing-lg, 16px);
  border: none;
  border-radius: 0;
}

.hcAlert[data-banner="false"] {
  border: 1px solid var(--hc-alert-border);
  border-radius: var(--radius-md, 4px);
}

.hcAlert[data-size="small"] { padding: 0.5rem 0.75rem; font-size: var(--font-size-sm, 14px); }
.hcAlert[data-size="medium"] { padding: 0.75rem 1rem; font-size: var(--font-size-base, 16px); }
.hcAlert[data-size="large"] { padding: 1rem 1.25rem; font-size: var(--font-size-base, 16px); }

.hcAlert {
  background: var(--hc-alert-bg);
  color: var(--hc-alert-text);
}

.hcAlertIcon {
  flex-shrink: 0;
  line-height: 1;
  position: relative;
  top: 5px;
}
.hcAlert[data-size="small"] .hcAlertIcon { font-size: var(--font-size-sm, 14px); }
.hcAlert[data-size="medium"] .hcAlertIcon { font-size: 1.25rem; }
.hcAlert[data-size="large"] .hcAlertIcon { font-size: var(--font-size-base, 16px); }

.hcAlertContent {
  flex: 1;
  min-width: 0;
}

.hcAlertTitle {
  font-size: var(--font-size-base, 16px);
  font-weight: 600;
  margin: 0;
}

.hcAlertDesc {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
}

.hcAlertClose {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s, background-color 0.2s;
}

.hcAlertClose:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}
`;
