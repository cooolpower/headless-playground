'use client';

// components/headless/avatar/avatar.tsx
import { type UseAvatarProps } from './type-avatar';
import { useAvatar } from './use-avatar';
import { avatarCss as _avatarCss } from './avatar.styles';
import { useStyles } from '../../hooks/use-styles';

export const AvatarCss = _avatarCss;

export function Avatar(props: UseAvatarProps) {
  const { children, injectStyles = true, ...avatarProps } = props;
  const avatar = useAvatar(avatarProps);

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-avatar-styles', _avatarCss, injectStyles);

  return (
    <div {...avatar.containerProps}>
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
