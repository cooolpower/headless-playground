'use client';

// components/headless/slider/slider.tsx
import { useSlider, type SliderMark } from './use-slider';
import { SliderProps } from './type-slider';
import { Icon } from '../icon/icon';
import { sliderCss as _sliderCss } from './slider.styles';

export function Slider(props: SliderProps) {
  const {
    containerProps,
    trackProps,
    fillProps,
    handle1Props,
    handle2Props,
    tooltipVisible1,
    tooltipVisible2,
    tooltipText1,
    tooltipText2,
    marks,
    handleIcon,
    railColor,
    vertical,
    isRange,
    values,
    percentage1,
    percentage2,
    isDragging,
    draggingIndex,
  } = useSlider(props);

  const {
    className,
    min = 0,
    max = 100,
    size = 'medium',
    disabled,
    injectStyles = true,
  } = props;

  // 툴팁 렌더링 함수
  const renderTooltip = (
    text: string,
    visible: boolean,
    isVertical: boolean,
  ) => {
    if (!visible) return null;
    return (
      <div
        className="hcSliderTooltip"
        data-vertical={isVertical ? 'true' : 'false'}
        style={
          isVertical
            ? {
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                marginRight: 'var(--spacing-tight)',
              }
            : {
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: 'var(--spacing-tight)',
              }
        }
      >
        {text}
        <div className="hcSliderTooltipArrow" />
      </div>
    );
  };

  // 핸들 렌더링 함수
  const renderHandle = (
    handleProps: any,
    tooltipVisible: boolean,
    tooltipText: string,
    percentage: number,
    index: number,
  ) => {
    const handleRest = { ...(handleProps as any), style: undefined };
    return (
      <div
        key={`handle-${index}`}
        className="hcSliderHandleWrap"
        style={
          vertical
            ? {
                left: '50%',
                bottom: `${percentage}%`,
                transform: 'translate(-50%, 50%)',
              }
            : {
                left: `${percentage}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }
        }
      >
        <div
          {...handleRest}
          className="hcSliderHandle"
          data-active={isDragging && draggingIndex === index ? 'true' : 'false'}
        >
          {handleIcon && (
            <span className="hcSliderHandleIcon">
              <Icon icon={handleIcon} size="small" />
            </span>
          )}
        </div>
        {renderTooltip(tooltipText, tooltipVisible, vertical || false)}
      </div>
    );
  };

  const containerRest = { ...(containerProps as any), style: undefined };
  const trackRest = { ...(trackProps as any), style: undefined };
  const fillRest = { ...(fillProps as any) };

  return (
    <div
      {...containerRest}
      className={className ? `hcSlider ${className}` : 'hcSlider'}
      data-vertical={vertical ? 'true' : 'false'}
      data-size={size}
      data-disabled={disabled ? 'true' : 'false'}
      data-dragging={isDragging ? 'true' : 'false'}
      style={
        {
          ...(railColor ? { '--hc-slider-fill': railColor } : null),
        } as React.CSSProperties
      }
    >
      {injectStyles ? <style suppressHydrationWarning>{_sliderCss}</style> : null}
      <div {...trackRest} className="hcSliderTrack">
        <div {...fillRest} className="hcSliderFill" />
        {/* Marks */}
        {marks &&
          marks.map((mark: SliderMark, index: number) => {
            const markPercentage = ((mark.value - min) / (max - min)) * 100;
            return (
              <div key={`mark-${index}`}>
                {/* Mark Dot */}
                <div
                  className="hcSliderMarkDot"
                  style={{
                    ...(vertical
                      ? {
                          left: '50%',
                          bottom: `${markPercentage}%`,
                          transform: 'translate(-50%, 50%)',
                        }
                      : {
                          left: `${markPercentage}%`,
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }),
                  }}
                />
                {/* Mark Icon or Label */}
                {(mark.icon || mark.label) && (
                  <div
                    className="hcSliderMarkLabel"
                    style={{
                      ...(vertical
                        ? {
                            right: '100%',
                            bottom: `${markPercentage}%`,
                            transform: 'translateY(50%)',
                            marginRight: 'var(--spacing-tight)',
                          }
                        : {
                            left: `${markPercentage}%`,
                            top: '100%',
                            transform: 'translateX(-50%)',
                            marginTop: 'var(--spacing-tight)',
                          }),
                    }}
                  >
                    {mark.icon ? (
                      <Icon icon={mark.icon} size="small" />
                    ) : (
                      mark.label
                    )}
                  </div>
                )}
              </div>
            );
          })}
        {/* Handle 1 */}
        {renderHandle(
          handle1Props,
          tooltipVisible1,
          tooltipText1,
          percentage1,
          0,
        )}
        {/* Handle 2 (Range 슬라이더인 경우) */}
        {isRange &&
          handle2Props &&
          renderHandle(
            handle2Props,
            tooltipVisible2,
            tooltipText2,
            percentage2,
            1,
          )}
      </div>
    </div>
  );
}

export const SliderCss = _sliderCss;
