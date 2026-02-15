'use client';

import React, { createContext, useContext, useState } from 'react';
import { Icon } from '@repo/ui';
import * as styles from './icon.demo.css';
import {
  Home,
  Search,
  Heart,
  Star,
  Settings,
  User,
  Mail,
  Phone,
  Camera,
  Music,
  Play,
  Pause,
  Check,
  X,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  Clock,
} from 'lucide-react';

// Export IconGallery for MDX
export { IconGallery } from './icon-gallery';

interface IconControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const IconControlsContext = createContext<IconControlsContextType | null>(null);

export function DemoIconProvider({ children }: { children: React.ReactNode }) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <IconControlsContext.Provider value={{ injectStyles, setInjectStyles }}>
      {children}
    </IconControlsContext.Provider>
  );
}

function useIconControls() {
  return useContext(IconControlsContext);
}

function iconClass(size: 'small' | 'medium' | 'large', extra?: string) {
  const sizeClass =
    size === 'small'
      ? styles.small
      : size === 'large'
        ? styles.large
        : styles.medium;
  return [styles.icon, sizeClass, extra].filter(Boolean).join(' ');
}

export function DemoIcon() {
  const ctx = useIconControls();
  const injectStyles = ctx?.injectStyles ?? true;

  return (
    <div
      className={`${styles.demoContainer} ${!injectStyles ? styles.iconWrapperClass : ''}`}
    >
      <h3 className={styles.demoTitle}>Icon Variants</h3>

      {/* Size Variants */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Size Variants</h4>
        <div className={styles.iconGrid}>
          <div className={styles.iconItem}>
            <Icon
              icon={Home}
              size="small"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('small')}
            />
            <span className={styles.iconLabel}>Small</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Home}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Medium</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Home}
              size="large"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('large')}
            />
            <span className={styles.iconLabel}>Large</span>
          </div>
        </div>
      </div>

      {/* Lucide Icon Collection */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Lucide Icon Collection</h4>
        <div className={styles.iconGrid}>
          <div className={styles.iconItem}>
            <Icon
              icon={Home}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Home</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Search}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Search</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Heart}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Heart</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Star}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Star</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Settings}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Settings</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={User}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>User</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Mail}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Mail</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Phone}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Phone</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Camera}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Camera</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Music}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Music</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Play}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Play</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Pause}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span className={styles.iconLabel}>Pause</span>
          </div>
        </div>
      </div>

      {/* Colored Icons */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Colored Icons</h4>
        <div className={styles.iconGrid}>
          <div className={styles.iconItem}>
            <Icon
              icon={Heart}
              size="medium"
              injectStyles={injectStyles}
              className={
                injectStyles
                  ? styles.primary
                  : iconClass('medium', styles.primary)
              }
            />
            <span className={styles.iconLabel}>Primary</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Check}
              size="medium"
              injectStyles={injectStyles}
              className={
                injectStyles
                  ? styles.success
                  : iconClass('medium', styles.success)
              }
            />
            <span className={styles.iconLabel}>Success</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={Settings}
              size="medium"
              injectStyles={injectStyles}
              className={
                injectStyles
                  ? styles.warning
                  : iconClass('medium', styles.warning)
              }
            />
            <span className={styles.iconLabel}>Warning</span>
          </div>
          <div className={styles.iconItem}>
            <Icon
              icon={X}
              size="medium"
              injectStyles={injectStyles}
              className={
                injectStyles ? styles.error : iconClass('medium', styles.error)
              }
            />
            <span className={styles.iconLabel}>Error</span>
          </div>
        </div>
      </div>

      {/* With Text */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Icons with Text</h4>
        <div className={styles.textWithIcon}>
          <div className={styles.textItem}>
            <Icon
              icon={Mail}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span>Contact Us</span>
          </div>
          <div className={styles.textItem}>
            <Icon
              icon={Settings}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span>Location</span>
          </div>
          <div className={styles.textItem}>
            <Icon
              icon={Clock}
              size="medium"
              injectStyles={injectStyles}
              className={injectStyles ? undefined : iconClass('medium')}
            />
            <span>Schedule</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IconControls() {
  const ctx = useIconControls();
  const injectStyles = ctx?.injectStyles ?? true;
  const setInjectStyles = ctx?.setInjectStyles;

  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Icon components provide consistent sizing and styling for icons
        throughout your application. Supports various sizes, colors, and can be
        combined with text.
      </p>

      {setInjectStyles && (
        <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={injectStyles}
            onChange={(e) => setInjectStyles(e.target.checked)}
          />
          Inject Styles
        </label>
      )}
    </div>
  );
}
