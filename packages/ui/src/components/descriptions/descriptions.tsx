import React, { forwardRef } from 'react';
import { DescriptionsProps, DescriptionsItemProps } from './type-descriptions';
import { descriptionsCss as _descriptionsCss } from './descriptions.styles';

export const DescriptionsCss = _descriptionsCss;

export const DescriptionsItem: React.FC<DescriptionsItemProps> = ({
  label,
  children,
  span = 1,
  className,
}) => {
  return (
    <div
      className={['hcDescriptionsItem', className].filter(Boolean).join(' ')}
      style={{ gridColumn: `span ${span}` }}
    >
      <div className="hcDescriptionsLabel">{label}</div>
      <div className="hcDescriptionsValue">{children}</div>
    </div>
  );
};

export const Descriptions = forwardRef<HTMLDivElement, DescriptionsProps>(
  (
    {
      title,
      items = [],
      column = 3,
      size = 'medium',
      bordered = false,
      layout = 'horizontal',
      colon = true,
      className,
      children,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    // column 값 처리
    const gridColumns = typeof column === 'number' ? column : column.md || 3;

    const renderItems = () => {
      if (items.length > 0) {
        return items.map((item, index) => (
          <DescriptionsItem
            key={item.key || index}
            label={colon ? `${item.label}:` : item.label}
            span={item.span}
          >
            {item.children}
          </DescriptionsItem>
        ));
      }

      if (children) {
        return React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...(child.props as object),
              key: child.key || index,
            });
          }
          return child;
        });
      }

      return null;
    };

    return (
      <div
        ref={ref}
        className={['hcDescriptions', className].filter(Boolean).join(' ')}
        data-size={size}
        data-bordered={bordered ? 'true' : 'false'}
        data-layout={layout}
        {...props}
      >
        {injectStyles && (
          <style suppressHydrationWarning>{_descriptionsCss}</style>
        )}

        {title && <div className="hcDescriptionsTitle">{title}</div>}

        <div
          className="hcDescriptionsList"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          }}
        >
          {renderItems()}
        </div>
      </div>
    );
  }
);

Descriptions.displayName = 'Descriptions';
