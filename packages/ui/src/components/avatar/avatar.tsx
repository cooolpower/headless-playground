'use client';

// components/headless/avatar/avatar.tsx
import { type UseAvatarProps } from './type-avatar';
import { useAvatar } from './use-avatar';
import { avatarCss as _avatarCss } from './avatar.styles';

export const AvatarCss = _avatarCss;

export function Avatar(props: UseAvatarProps) {
  const { children, injectStyles = true, ...avatarProps } = props;
  const avatar = useAvatar(avatarProps);

  return (
    <div {...avatar.containerProps}>
      {injectStyles && <style suppressHydrationWarning>{_avatarCss}</style>}
      {avatar.showImage ? (
        <img {...avatar.imageProps} />
      ) : children ? (
        <div {...avatar.fallbackProps}>{children}</div>
      ) : (
        <div {...avatar.fallbackProps}>{avatar.fallbackText}</div>
      )}
    </div>
  );
}
