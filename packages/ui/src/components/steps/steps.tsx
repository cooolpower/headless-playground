'use client';

import React, { forwardRef } from 'react';
import { StepsProps, StepProps } from './type-steps';
import { stepsCss as _stepsCss } from './steps.styles';

export const StepsCss = _stepsCss;

export const Step: React.FC<StepProps> = ({
  title,
  description,
  icon,
  status = 'wait',
  disabled = false,
  stepNumber = 1,
  isLast = false,
  direction = 'horizontal',
  size = 'medium',
  onClick,
  injectStyles = true,
}) => {
  const getStatusIcon = () => {
    if (icon) return icon;

    switch (status) {
      case 'finish':
        return '✓';
      case 'error':
        return '✕';
      default:
        return stepNumber;
    }
  };

  return (
    <div
      className="hcStep"
      data-status={status}
      data-disabled={disabled ? 'true' : 'false'}
      data-direction={direction}
      data-size={size}
    >
      {injectStyles && <style suppressHydrationWarning>{_stepsCss}</style>}

      <div className="hcStepMain">
        <button
          type="button"
          className="hcStepIcon"
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
        >
          {getStatusIcon()}
        </button>

        <div className="hcStepContent">
          <div className="hcStepTitle">{title}</div>
          {description && (
            <div className="hcStepDescription">{description}</div>
          )}
        </div>
      </div>

      {!isLast && <div className="hcStepTail" />}
    </div>
  );
};

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      items = [],
      current = 0,
      direction = 'horizontal',
      size = 'medium',
      status,
      onChange,
      className,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={['hcSteps', className].filter(Boolean).join(' ')}
        data-direction={direction}
        data-size={size}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_stepsCss}</style>}
        {items.map((item, index) => {
          // 현재 스텝의 상태 결정
          let itemStatus = item.status;
          if (!itemStatus) {
            if (index < current) {
              itemStatus = 'finish';
            } else if (index === current) {
              itemStatus = status || 'process';
            } else {
              itemStatus = 'wait';
            }
          }

          return (
            <Step
              key={index}
              {...item}
              status={itemStatus}
              stepNumber={index + 1}
              isLast={index === items.length - 1}
              direction={direction}
              size={size}
              onClick={() => !item.disabled && onChange?.(index)}
              injectStyles={false}
            />
          );
        })}
      </div>
    );
  }
);

Steps.displayName = 'Steps';
