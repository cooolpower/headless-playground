'use client';

import React, { useState, createContext, useContext } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './dropdown.css';

interface DropdownControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const DropdownControlsContext =
  createContext<DropdownControlsContextType | null>(null);

export function DemoDropdownBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <DropdownControlsContext.Provider value={{ injectStyles, setInjectStyles }}>
      {children}
    </DropdownControlsContext.Provider>
  );
}

// Basic Dropdown Demo
export function DemoDropdownBasicWithControls() {
  const ctx = useContext(DropdownControlsContext);
  const injectStyles = ctx?.injectStyles ?? true;
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.dropdownWrapperClass : ''}`}
    >
      <Dropdown injectStyles={injectStyles} className={styles.dropdownWrapper}>
        <DropdownTrigger className={styles.triggerButton}>
          {selectedItem || 'Select Option'}
          <span className={styles.arrow}>▼</span>
        </DropdownTrigger>
        <DropdownMenu className={styles.dropdownMenu}>
          <DropdownItem onClick={() => handleItemClick('Option 1')}>
            Option 1
          </DropdownItem>
          <DropdownItem onClick={() => handleItemClick('Option 2')}>
            Option 2
          </DropdownItem>
          <DropdownItem onClick={() => handleItemClick('Option 3')}>
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {selectedItem && (
        <div className={styles.selectionDisplay}>
          <strong>Selected:</strong> {selectedItem}
        </div>
      )}
    </div>
  );
}

// With Icons Demo
export function DemoDropdownWithIcons() {
  const ctx = useContext(DropdownControlsContext);
  const injectStyles = ctx?.injectStyles ?? true;
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className={styles.section}>
      <Dropdown injectStyles={injectStyles} className={styles.dropdownWrapper}>
        <DropdownTrigger className={styles.triggerButton}>
          <span className={styles.icon}>⚙️</span>
          Settings
          <span className={styles.arrow}>▼</span>
        </DropdownTrigger>
        <DropdownMenu className={styles.dropdownMenu}>
          <DropdownItem onClick={() => handleItemClick('Profile')}>
            <span className={styles.icon}>👤</span>
            Profile
          </DropdownItem>
          <DropdownItem onClick={() => handleItemClick('Settings')}>
            <span className={styles.icon}>⚙️</span>
            Settings
          </DropdownItem>
          <DropdownItem onClick={() => handleItemClick('Logout')}>
            <span className={styles.icon}>🚪</span>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {selectedItem && (
        <div className={styles.selectionDisplay}>
          <strong>Selected:</strong> {selectedItem}
        </div>
      )}
    </div>
  );
}

// With Disabled Items Demo
export function DemoDropdownWithDisabled() {
  const ctx = useContext(DropdownControlsContext);
  const injectStyles = ctx?.injectStyles ?? true;
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className={styles.section}>
      <Dropdown injectStyles={injectStyles} className={styles.dropdownWrapper}>
        <DropdownTrigger className={styles.triggerButton}>
          User Actions
          <span className={styles.arrow}>▼</span>
        </DropdownTrigger>
        <DropdownMenu className={styles.dropdownMenu}>
          <DropdownItem onClick={() => handleItemClick('View Profile')}>
            View Profile
          </DropdownItem>
          <DropdownItem onClick={() => handleItemClick('Edit Profile')}>
            Edit Profile
          </DropdownItem>
          <DropdownItem disabled>Delete Account (Disabled)</DropdownItem>
          <DropdownItem onClick={() => handleItemClick('Sign Out')}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {selectedItem && (
        <div className={styles.selectionDisplay}>
          <strong>Selected:</strong> {selectedItem}
        </div>
      )}
    </div>
  );
}

export function DemoDropdown() {
  return (
    <div className={styles.demoContainer}>
      <h3 className={styles.demoTitle}>Dropdown Variants</h3>
    </div>
  );
}

export function DemoDropdownBasicControls() {
  const ctx = useContext(DropdownControlsContext);
  if (!ctx) return null;

  const { injectStyles, setInjectStyles } = ctx;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(checked) => setInjectStyles(checked)}
              size="small"
            >
              기본 스타일 주입
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

export function DemoDropdownBasic() {
  return (
    <DemoDropdownBasicProvider>
      <DemoDropdownBasicWithControls />
    </DemoDropdownBasicProvider>
  );
}
