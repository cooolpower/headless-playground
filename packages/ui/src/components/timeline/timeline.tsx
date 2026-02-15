'use client';

import React, { forwardRef } from 'react';
import { TimelineProps, TimelineItemProps } from './type-timeline';
import { timelineCss as _timelineCss } from './timeline.styles';

export const TimelineCss = _timelineCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  color = 'blue',
  dot,
  label,
  children,
  position,
  isLast = false,
  className,
  classNames,
  injectStyles = true,
}) => {
  const defaultDot = <div className={cx('hcTimelineDot', classNames?.dot)} />;

  return (
    <div
      className={cx('hcTimelineItem', classNames?.item, className)}
      data-color={color}
      data-position={position}
    >
      {injectStyles && <style suppressHydrationWarning>{_timelineCss}</style>}

      {!isLast && (
        <div className={cx('hcTimelineItemTail', classNames?.itemTail)} />
      )}

      <div className={cx('hcTimelineItemHead', classNames?.itemHead)}>
        {dot || defaultDot}
      </div>

      <div className={cx('hcTimelineItemContent', classNames?.itemContent)}>
        {label && (
          <div className={cx('hcTimelineItemLabel', classNames?.itemLabel)}>
            {label}
          </div>
        )}
        {children && (
          <div
            className={cx(
              'hcTimelineItemDescription',
              classNames?.itemDescription
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      items = [],
      mode = 'left',
      pending,
      pendingDot,
      reverse = false,
      className,
      classNames,
      children,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const renderItems = () => {
      let itemList: TimelineItemProps[] = [];

      if (items.length > 0) {
        itemList = items.map((item, index) => ({
          ...item,
          isLast: index === items.length - 1 && !pending,
          classNames,
          position:
            mode === 'alternate'
              ? item.position || (index % 2 === 0 ? 'left' : 'right')
              : mode,
        }));
      } else if (children) {
        const childArray = React.Children.toArray(children);
        itemList = childArray.map((child, index) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as TimelineItemProps;
            return {
              ...(child.props as object),
              isLast: index === childArray.length - 1 && !pending,
              classNames,
              position:
                mode === 'alternate'
                  ? childProps.position || (index % 2 === 0 ? 'left' : 'right')
                  : (childProps.position as any) || mode,
            };
          }
          return {
            isLast: index === childArray.length - 1 && !pending,
            classNames,
            position: mode === 'alternate' ? (index % 2 === 0 ? 'left' : 'right') : mode,
          };
        });
      }

      if (reverse) {
        itemList.reverse();
      }

      // pending 아이템 추가
      if (pending) {
        const pendingItem: TimelineItemProps = {
          dot: pendingDot || <div className={classNames?.dot} />,
          children: pending,
          isLast: true,
          classNames,
          position: mode === 'alternate' ? 'left' : mode,
        };
        itemList.push(pendingItem);
      }

      return itemList.map((item, index) => (
        <TimelineItem
          key={item.key || index}
          {...item}
          injectStyles={false}
        />
      ));
    };

    return (
      <div
        ref={ref}
        className={cx('hcTimeline', classNames?.timeline, className)}
        data-mode={mode}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_timelineCss}</style>}
        {renderItems()}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';
