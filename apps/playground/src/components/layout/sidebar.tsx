'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './sidebar.css';

interface ComponentItem {
  slug: string;
  label: string;
}

// 컴포넌트 레지스트리 패턴 - 카테고리별로 그룹화
const COMPONENT_REGISTRY = {
  'Basic Components': [
    { slug: 'alert', label: 'Alert' },
    { slug: 'avatar', label: 'Avatar' },
    { slug: 'badge', label: 'Badge' },
    { slug: 'button', label: 'Button' },
    { slug: 'card', label: 'Card' },
    { slug: 'divider', label: 'Divider' },
    { slug: 'icon', label: 'Icon' },
    { slug: 'progress', label: 'Progress' },
    { slug: 'tag', label: 'Tag' },
    { slug: 'typography', label: 'Typography' },
  ] as ComponentItem[],
  'Form Components': [
    { slug: 'input', label: 'Input' },
    { slug: 'textarea', label: 'Textarea' },
    { slug: 'input-number', label: 'Input Number' },
    { slug: 'auto-complete', label: 'Auto Complete' },
    { slug: 'cascader', label: 'Cascader' },
    { slug: 'checkbox', label: 'Checkbox' },
    { slug: 'radio', label: 'Radio' },
    { slug: 'switch', label: 'Switch' },
    { slug: 'select', label: 'Select' },
    { slug: 'slider', label: 'Slider' },
    { slug: 'tabs', label: 'Tabs' },
    { slug: 'breadcrumb', label: 'Breadcrumb' },
    { slug: 'dropdown', label: 'Dropdown' },
    { slug: 'form', label: 'Form' },
    { slug: 'rate', label: 'Rate' },
    { slug: 'countdown', label: 'Countdown' },
    { slug: 'flip-countdown', label: 'Flip Countdown' },
    { slug: 'transfer', label: 'Transfer' },
    { slug: 'upload', label: 'Upload' },
    { slug: 'dynamic-tags', label: 'Dynamic Tags' },
    { slug: 'dynamic-input', label: 'Dynamic Input' },
  ] as ComponentItem[],
  'Data Display': [
    { slug: 'list', label: 'List' },
    { slug: 'table', label: 'Table' },
    { slug: 'data-table', label: 'Data Table' },
    { slug: 'descriptions', label: 'Descriptions' },
    { slug: 'statistic', label: 'Statistic' },
    { slug: 'timeline', label: 'Timeline' },
    { slug: 'tree', label: 'Tree' },
    { slug: 'tree-select', label: 'Tree Select' },
    { slug: 'chart', label: 'Chart' },
    { slug: 'heatmap', label: 'Heatmap' },
    { slug: 'map', label: 'Map' },
  ] as ComponentItem[],
  Navigation: [
    { slug: 'menu', label: 'Menu' },
    { slug: 'pagination', label: 'Pagination' },
    { slug: 'steps', label: 'Steps' },
  ] as ComponentItem[],
  Feedback: [
    { slug: 'modal', label: 'Modal' },
    { slug: 'drawer', label: 'Drawer' },
    { slug: 'dialog', label: 'Dialog' },
    { slug: 'popover', label: 'Popover' },
    { slug: 'tooltip', label: 'Tooltip' },
    { slug: 'toast', label: 'Toast' },
    { slug: 'snackbar', label: 'Snackbar' },
    { slug: 'loading-bar', label: 'Loading Bar' },
    { slug: 'empty', label: 'Empty' },
  ] as ComponentItem[],
  'Date & Time': [
    { slug: 'calendar', label: 'Calendar' },
    { slug: 'date-picker', label: 'Date Picker' },
    { slug: 'time-picker', label: 'Time Picker' },
  ] as ComponentItem[],
  Layout: [
    { slug: 'page-header', label: 'Page Header' },
    { slug: 'float-button', label: 'Float Button' },
    { slug: 'watermark', label: 'Watermark' },
  ] as ComponentItem[],
  Media: [
    { slug: 'carousel', label: 'Carousel' },
    { slug: 'image', label: 'Image' },
    { slug: 'ellipsis', label: 'Ellipsis' },
    { slug: 'gradient-text', label: 'Gradient Text' },
    { slug: 'qr-code', label: 'QR Code' },
  ] as ComponentItem[],
  Other: [
    { slug: 'collapse', label: 'Collapse' },
    { slug: 'color-picker', label: 'Color Picker' },
    { slug: 'mention', label: 'Mention' },
  ] as ComponentItem[],
} as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar} data-sidebar>
      <nav className={styles.sidebarNav}>
        {Object.entries(COMPONENT_REGISTRY).map(([category, components]) => (
          <div key={category} className={styles.sidebarNavContent}>
            <h2 className={styles.sidebarNavListTitle}>{category}</h2>
            <ul className={styles.sidebarNavList}>
              {[...components]
                .sort((a, b) => a.label.localeCompare(b.label))
                .map(({ slug, label }) => {
                  const href = `/components/${slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={slug} className={styles.sidebarNavListItem}>
                      <Link
                        href={href}
                        className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-neutral-900 text-white'
                            : 'text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
