'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './sidebar.css';

export interface ComponentItem {
  slug: string;
  label: string;
  type?: 'doc' | 'component';
}

export const DOCS_REGISTRY: Record<string, ComponentItem[]> = {
  'Getting Started': [
    { slug: 'introduction', label: 'Introduction', type: 'doc' },
    { slug: 'installation', label: 'Installation', type: 'doc' },
  ],
  'Core Concepts': [
    { slug: 'theming', label: 'Theming', type: 'doc' },
    { slug: 'dark-mode', label: 'Dark Mode', type: 'doc' },
    { slug: 'customization', label: 'Customization', type: 'doc' },
  ],
};

export const COMPONENTS_REGISTRY: Record<string, ComponentItem[]> = {
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
  ],
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
  ],
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
  ],
  Navigation: [
    { slug: 'menu', label: 'Menu' },
    { slug: 'pagination', label: 'Pagination' },
    { slug: 'steps', label: 'Steps' },
  ],
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
  ],
  'Date & Time': [
    { slug: 'calendar', label: 'Calendar' },
    { slug: 'date-picker', label: 'Date Picker' },
    { slug: 'time-picker', label: 'Time Picker' },
  ],
  Layout: [
    { slug: 'page-header', label: 'Page Header' },
    { slug: 'float-button', label: 'Float Button' },
    { slug: 'watermark', label: 'Watermark' },
  ],
  Media: [
    { slug: 'carousel', label: 'Carousel' },
    { slug: 'image', label: 'Image' },
    { slug: 'ellipsis', label: 'Ellipsis' },
    { slug: 'gradient-text', label: 'Gradient Text' },
    { slug: 'qr-code', label: 'QR Code' },
  ],
  Other: [
    { slug: 'collapse', label: 'Collapse' },
    { slug: 'color-picker', label: 'Color Picker' },
    { slug: 'mention', label: 'Mention' },
  ],
};

interface SidebarProps {
  registry: Record<string, ComponentItem[]>;
}

export function Sidebar({ registry }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar} data-sidebar>
      <nav className={styles.navGroup}>
        {Object.entries(registry).map(([category, components]) => (
          <div key={category}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <ul className={styles.navList}>
              {[...components]
                .sort((a, b) => {
                  // Getting Started 카테고리는 정렬하지 않고 원본 순서 유지
                  if (category === 'Getting Started') return 0;
                  return a.label.localeCompare(b.label);
                })
                .map(({ slug, label, type }) => {
                  const basePath = type === 'doc' ? '/docs' : '/components';
                  const href = `${basePath}/${slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={slug} className={styles.navItem}>
                      <Link
                        href={href}
                        className={
                          isActive ? styles.activeNavLink : styles.navLink
                        }
                      >
                        {isActive && <div className={styles.activeDot} />}
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
