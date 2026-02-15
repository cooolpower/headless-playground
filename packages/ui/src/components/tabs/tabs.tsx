'use client';

// components/headless/tabs/tabs.tsx
import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useTabs, type TabItem } from './use-tabs';
import { TabsProps } from './type-tabs';
import { tabsCss as _tabsCss } from './tabs.styles';

export function Tabs(props: TabsProps) {
  const {
    tabBarProps,
    getTabProps,
    contentContainerProps,
    tabPanelProps,
    activeTab,
    tabPosition,
    containerProps,
  } = useTabs(props);

  const { items = [] } = props;

  const { className, injectStyles = true, type = 'line' } = props;

  const tabBar = (
    <div {...(tabBarProps as any)} className="hcTabsBar">
      {items.map((item: TabItem, index: number) => (
        <div key={item.key} {...(getTabProps(item, index) as any)} className="hcTabsTab" data-disabled={item.disabled ? 'true' : 'false'}>
          {item.icon && <span key={`${item.key}-icon`}>{item.icon}</span>}
          {Array.isArray(item.label) ? (
            item.label.map((child, childIndex) => (
              <React.Fragment key={`${item.key}-label-${childIndex}`}>
                {child}
              </React.Fragment>
            ))
          ) : (
            <span key={`${item.key}-label`}>{item.label}</span>
          )}
          {item.closable && (
            <button
              key={`${item.key}-close`}
              onClick={(e) => {
                e.stopPropagation();
                props.onTabClose?.(item.key);
              }}
              className="hcTabsTabClose"
            >
              <Icon icon={X} size="small" />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const tabContent = (
    <div {...(contentContainerProps as any)} className="hcTabsContent">
      {activeTab?.loading === true ? (
        <div className="hcTabsLoading">
          <div className="hcTabsSpinner">
            <Icon icon={Loader2} size="small" />
          </div>
          <span>로딩 중...</span>
        </div>
      ) : activeTab?.content ? (
        <div {...(tabPanelProps as any)} className="hcTabsPanel">
          {activeTab.content}
        </div>
      ) : null}
    </div>
  );

  return (
    <div
      {...(containerProps as any)}
      className={className ? `hcTabs ${className}` : 'hcTabs'}
      data-position={tabPosition}
      data-type={type}
    >
      {injectStyles ? <style suppressHydrationWarning>{_tabsCss}</style> : null}
      {tabPosition === 'bottom' || tabPosition === 'right' ? (
        <>
          {tabContent}
          {tabBar}
        </>
      ) : (
        <>
          {tabBar}
          {tabContent}
        </>
      )}
    </div>
  );
}

export const TabsCss = _tabsCss;
