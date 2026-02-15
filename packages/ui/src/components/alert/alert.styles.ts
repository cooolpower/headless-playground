export const alertCss = `
.hcAlert{
  --hc-alert-bg: var(--color-semantic-info);
  --hc-alert-border: var(--color-semantic-info-hover);
  --hc-alert-text: var(--color-text-on-info);
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-base);
  line-height: 1.5;
}

.hcAlert[data-type="success"]{
  --hc-alert-bg: var(--color-semantic-success);
  --hc-alert-border: var(--color-semantic-success-hover);
  --hc-alert-text: var(--color-text-on-success);
}
.hcAlert[data-type="error"]{
  --hc-alert-bg: var(--color-semantic-error);
  --hc-alert-border: var(--color-semantic-error-hover);
  --hc-alert-text: var(--color-text-on-error);
}
.hcAlert[data-type="warning"]{
  --hc-alert-bg: var(--color-semantic-warning);
  --hc-alert-border: var(--color-semantic-warning-hover);
  --hc-alert-text: var(--color-text-on-warning);
}
.hcAlert[data-type="info"]{
  --hc-alert-bg: var(--color-semantic-info);
  --hc-alert-border: var(--color-semantic-info-hover);
  --hc-alert-text: var(--color-text-on-info);
}

.hcAlert[data-banner="true"]{
  width: 100%;
  padding: var(--spacing-base) var(--spacing-lg);
  border: none;
  border-radius: 0;
}

.hcAlert[data-banner="false"]{
  border: var(--border-width-thin) solid var(--hc-alert-border);
  border-radius: var(--radius-md);
}

.hcAlert[data-size="small"]{ padding: 0.5rem 0.75rem; font-size: var(--font-size-sm); }
.hcAlert[data-size="medium"]{ padding: 0.75rem 1rem; font-size: var(--font-size-base); }
.hcAlert[data-size="large"]{ padding: 1rem 1.25rem; font-size: var(--font-size-base); }

.hcAlert{
  background: var(--hc-alert-bg);
  color: var(--hc-alert-text);
}

.hcAlertIcon{
  flex-shrink: 0;
  line-height: 1;
  position: relative;
  top: 5px;
}
.hcAlert[data-size="small"] .hcAlertIcon{ font-size: var(--font-size-sm); }
.hcAlert[data-size="medium"] .hcAlertIcon{ font-size: var(--font-size-md); }
.hcAlert[data-size="large"] .hcAlertIcon{ font-size: var(--font-size-base); }

.hcAlertContent{
  flex: 1;
  min-width: 0;
}

.hcAlertTitle{
  fontSize: 'var(--font-size-base)',
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.hcAlertDesc{
  fontSize: 'var(--font-size-md)',
  margin: 0;
  opacity: 0.9;
}

.hcAlertClose{
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
  border-radius: var(--radius-sm);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s, background-color 0.2s;
}

.hcAlertClose:hover{
  opacity: 1;
  background: color-mix(in oklch, currentColor 10%, transparent);
}
`;

