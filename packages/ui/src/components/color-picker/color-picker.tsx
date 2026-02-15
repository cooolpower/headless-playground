'use client';

import React, { forwardRef } from 'react';
import { ColorPickerProps } from './type-color-picker';
import { useColorPicker } from './use-color-picker';
import { colorPickerCss as _colorPickerCss } from './color-picker.styles';

export const ColorPickerCss = _colorPickerCss;

const ColorPickerComponent = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      disabled = false,
      className,
      children,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const { color, isOpen, setIsOpen, handleColorChange } = useColorPicker({
      value,
      defaultValue,
      onChange,
    });

    return (
      <div
        ref={ref}
        className={['hcColorPicker', className].filter(Boolean).join(' ')}
        {...props}
      >
        {injectStyles && (
          <style suppressHydrationWarning>{_colorPickerCss}</style>
        )}
        {children || (
          <>
            <div className="hcColorPickerTop">
              <button
                type="button"
                className="hcColorPickerSwatch"
                style={{ backgroundColor: color }}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                aria-label="색상 선택기 열기"
              />
              <input
                className="hcColorPickerInput"
                type="text"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                disabled={disabled}
              />
            </div>
            {isOpen && (
              <div className="hcColorPickerPopover">
                {/* 간단한 색상 팔레트 */}
                <div className="hcColorPickerPalette">
                  {[
                    'oklch(62.8% 0.258 29.2)',
                    'oklch(86.6% 0.295 142.5)',
                    'oklch(45.2% 0.313 264.1)',
                    'oklch(96.8% 0.211 109.8)',
                    'oklch(70.2% 0.322 328.4)',
                    'oklch(90.5% 0.155 194.8)',
                    'var(--color-neutral-0)',
                    'var(--color-neutral-1000)',
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="hcColorPickerChip"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        handleColorChange(color);
                        setIsOpen(false);
                      }}
                      aria-label={`색상 선택: ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

ColorPickerComponent.displayName = 'ColorPicker';

export const ColorPicker = ColorPickerComponent;

ColorPicker.displayName = 'ColorPicker';
