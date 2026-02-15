export const gradientTextCss = `
.hcGradientText {
  background: linear-gradient(
    45deg,
    var(--color-semantic-info),
    var(--color-brand-primary)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-color: transparent;
}

.hcGradientText[data-type="radial"] {
  background: radial-gradient(
    circle,
    var(--color-semantic-info),
    var(--color-brand-primary)
  );
}
`;

