'use client';

import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Icon } from '@repo/ui';
import * as styles from './icon.demo.css';

// Popular icon categories based on Lucide's organization
const iconCategories = {
  Common: [
    'Home',
    'Search',
    'User',
    'Settings',
    'Mail',
    'Heart',
    'Star',
    'Bell',
    'Calendar',
    'Clock',
  ],
  Arrows: [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ChevronUp',
    'ChevronDown',
    'ChevronLeft',
    'ChevronRight',
  ],
  Actions: [
    'Plus',
    'Minus',
    'X',
    'Check',
    'Edit',
    'Trash',
    'Copy',
    'Download',
    'Upload',
    'Save',
  ],
  Media: [
    'Play',
    'Pause',
    'SkipForward',
    'SkipBack',
    'Volume',
    'VolumeX',
    'Music',
    'Image',
    'Video',
    'Camera',
  ],
  Communication: [
    'MessageCircle',
    'MessageSquare',
    'Phone',
    'Mail',
    'Send',
    'Reply',
    'Share',
    'AtSign',
  ],
  Files: [
    'File',
    'FileText',
    'Folder',
    'FolderOpen',
    'Image',
    'FileImage',
    'FileCode',
    'Archive',
  ],
  Navigation: [
    'Menu',
    'MoreVertical',
    'MoreHorizontal',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'Map',
    'Compass',
  ],
  Status: [
    'CheckCircle',
    'XCircle',
    'AlertCircle',
    'Info',
    'AlertTriangle',
    'HelpCircle',
    'Check',
    'X',
  ],
  Shapes: [
    'Circle',
    'Square',
    'Triangle',
    'Hexagon',
    'Pentagon',
    'Star',
    'Heart',
  ],
  Tools: [
    'Wrench',
    'Hammer',
    'Screwdriver',
    'Scissors',
    'Brush',
    'Palette',
    'Ruler',
  ],
};

// Flatten all icons from categories and remove duplicates
const allIcons = Array.from(new Set(Object.values(iconCategories).flat()));

export function IconGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    let icons = selectedCategory
      ? iconCategories[selectedCategory as keyof typeof iconCategories] || []
      : allIcons;

    // Remove duplicates
    icons = Array.from(new Set(icons));

    if (searchQuery) {
      icons = icons.filter((iconName) =>
        iconName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return icons;
  }, [searchQuery, selectedCategory]);

  // Get icon component from Lucide
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[
      iconName
    ] as LucideIcons.LucideIcon;
    return IconComponent || null;
  };

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
    // Copy icon name to clipboard
    navigator.clipboard.writeText(`import { ${iconName} } from 'lucide-react'`);
  };

  return (
    <div className={styles.galleryContainer}>
      {/* Search and Filter */}
      <div className={styles.galleryControls}>
        <input
          type="text"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.categoryTabs}>
          <button
            className={`${styles.categoryTab} ${selectedCategory === null ? styles.active : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {Object.keys(iconCategories).map((category) => (
            <button
              key={category}
              className={`${styles.categoryTab} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Icon Info */}
      {selectedIcon && (
        <div className={styles.selectedIconInfo}>
          <div className={styles.selectedIconPreview}>
            <Icon icon={getIconComponent(selectedIcon)} size="large" />
            <span className={styles.selectedIconName}>{selectedIcon}</span>
          </div>
          <div className={styles.codeBlock}>
            <code>
              {`import { ${selectedIcon} } from 'lucide-react'\n\n<Icon icon={${selectedIcon}} size="medium" />`}
            </code>
            <button
              className={styles.copyButton}
              onClick={() => handleIconClick(selectedIcon)}
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Icon Grid */}
      <div className={styles.iconGrid}>
        {filteredIcons.map((iconName) => {
          const IconComponent = getIconComponent(iconName);
          if (!IconComponent) return null;

          return (
            <div
              key={iconName}
              className={`${styles.iconItem} ${selectedIcon === iconName ? styles.selected : ''}`}
              onClick={() => handleIconClick(iconName)}
            >
              <Icon icon={IconComponent} size="medium" />
              <span className={styles.iconLabel}>{iconName}</span>
            </div>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className={styles.emptyState}>
          No icons found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
