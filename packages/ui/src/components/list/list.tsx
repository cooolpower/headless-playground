'use client';

// components/headless/list/list.tsx
import { useList } from './use-list';
import { ListProps } from './type-list';
import { listCss as _listCss } from './list.styles';

export const ListCss = _listCss;

export function List(props: ListProps) {
  const {
    data,
    containerProps,
    headerProps,
    listProps,
    getItemProps,
    footerProps,
    loadingProps,
    emptyProps,
  } = useList(props);

  const { className, header, footer, emptyText, renderItem, injectStyles = true } =
    props;

  return (
    <div
      {...containerProps}
      className={[containerProps.className, className].filter(Boolean).join(' ')}
    >
      {injectStyles && <style suppressHydrationWarning>{_listCss}</style>}
      {headerProps && header && (
        <div {...headerProps} className={headerProps.className}>
          {header}
        </div>
      )}

      {loadingProps ? (
        <div {...loadingProps} className={loadingProps.className}>
          Loading...
        </div>
      ) : data.length === 0 && emptyProps ? (
        <div {...emptyProps} className={emptyProps.className}>
          {emptyText}
        </div>
      ) : (
        <ul {...listProps} className={listProps.className}>
          {data.map((item, index) => (
            <li
              {...getItemProps(index)}
              className={getItemProps(index).className}
              key={index}
            >
              {renderItem ? renderItem(item, index) : item}
            </li>
          ))}
        </ul>
      )}

      {footerProps && footer && (
        <div {...footerProps} className={footerProps.className}>
          {footer}
        </div>
      )}
    </div>
  );
}
