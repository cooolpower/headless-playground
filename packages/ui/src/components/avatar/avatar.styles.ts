export const avatarCss = `
.hcAvatar{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  overflow: hidden;
  background: var(--color-surface);
}

.hcAvatar[data-size="small"]{ width: 2rem; height: 2rem; }
.hcAvatar[data-size="medium"]{ width: 2.5rem; height: 2.5rem; }
.hcAvatar[data-size="large"]{ width: 3.5rem; height: 3.5rem; }

.hcAvatarImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hcAvatarFallback{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.hcAvatar[data-size="small"] .hcAvatarFallback{ font-size: var(--font-size-xs); }
.hcAvatar[data-size="medium"] .hcAvatarFallback{ font-size: var(--font-size-sm); }
.hcAvatar[data-size="large"] .hcAvatarFallback{ font-size: var(--font-size-lg); }
`;

