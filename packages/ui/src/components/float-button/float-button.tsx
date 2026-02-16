'use client';

// components/headless/float-button/float-button.tsx
import type { ReactNode } from 'react';
import { useState, useEffect, Children, cloneElement } from 'react';
import { useFloatButton, type UseFloatButtonProps } from './use-float-button';
import {
  UseFloatButtonGroupProps,
  UseFloatButtonBackTopProps,
} from './type-float-button';
import { floatButtonCss as _floatButtonCss } from './float-button.styles';

export const FloatButtonCss = _floatButtonCss;

export function FloatButton(
  props: UseFloatButtonProps & { children: ReactNode },
) {
  const { injectStyles = true } = props;
  const floatButton = useFloatButton(props);
  return (
    <button {...floatButton}>
      {injectStyles && (
        <style suppressHydrationWarning>{_floatButtonCss}</style>
      )}
      {props.children}
    </button>
  );
}

// Float Button Group for multiple buttons

export function useFloatButtonGroup({
  children,
  spacing = 16,
  direction = 'column',
}: UseFloatButtonGroupProps) {
  // const basePosition = {
  //   'bottom-right': { bottom: '20px', right: '20px' },
  //   'bottom-left': { bottom: '20px', left: '20px' },
  //   'top-right': { top: '20px', right: '20px' },
  //   'top-left': { top: '20px', left: '20px' }
  // }

  return {
    className: 'hcFloatButtonGroup',
    'data-direction': direction,
    style: {
      ['--hc-fb-group-gap' as any]: `${spacing}px`,
    } as any,
  };
}

export function FloatButtonGroup(props: UseFloatButtonGroupProps) {
  const { injectStyles = true, className } = props;
  const floatButtonGroup = useFloatButtonGroup(props);

  // 각 FloatButton에 inGroup prop을 추가
  const childrenWithInGroup = Children.map(props.children, (child) => {
    if (child && typeof child === 'object' && 'props' in child) {
      return cloneElement(child as any, {
        inGroup: true,
        ...(injectStyles ? { injectStyles: false } : {}),
      });
    }
    return child;
  });

  return (
    <div
      {...floatButtonGroup}
      className={[floatButtonGroup.className, className]
        .filter(Boolean)
        .join(' ')}
    >
      {injectStyles && (
        <style suppressHydrationWarning>{_floatButtonCss}</style>
      )}
      {childrenWithInGroup}
    </div>
  );
}

// Back to Top Button

export function FloatButtonBackTop({
  visibilityHeight = 400,
  target,
  injectStyles = true,
  ...props
}: UseFloatButtonBackTopProps & { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollTarget = target?.() || window;

    const handleScroll = () => {
      if (scrollTarget === window) {
        setVisible(window.scrollY > visibilityHeight);
      } else if (scrollTarget instanceof HTMLElement) {
        setVisible(scrollTarget.scrollTop > visibilityHeight);
      }
    };

    const targetElement = scrollTarget === window ? window : scrollTarget;
    targetElement.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 체크

    return () => targetElement.removeEventListener('scroll', handleScroll);
  }, [visibilityHeight, target]);

  const handleClick = () => {
    const scrollTarget = target?.() || window;
    if (scrollTarget === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (scrollTarget instanceof HTMLElement) {
      scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
    }
    props.onClick?.();
  };

  const buttonProps = useFloatButton({
    ...props,
    onClick: handleClick,
    position: props.position || 'bottom-right',
    type: props.type || 'primary',
    show: visible,
  });

  return (
    <button {...buttonProps} style={{ ...buttonProps.style }}>
      {injectStyles && (
        <style suppressHydrationWarning>{_floatButtonCss}</style>
      )}
      {props.children}
    </button>
  );
}
