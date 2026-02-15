'use client';

import React, { useState, createContext, useContext } from 'react';
import { Autocomplete } from '@repo/ui';
import { Input } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './auto-complete.demo.css';

interface AutocompleteControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const AutocompleteControlsContext =
  createContext<AutocompleteControlsContextType | null>(null);

export function DemoAutocompleteBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <AutocompleteControlsContext.Provider
      value={{ injectStyles, setInjectStyles }}
    >
      {children}
    </AutocompleteControlsContext.Provider>
  );
}

export function DemoAutocompleteBasicWithControls() {
  const context = useContext(AutocompleteControlsContext);
  if (!context)
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

  const { injectStyles } = context;

  // 기본 사용법
  //export function DemoAutocompleteBasic() {
  const [value, setValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div
      className={!injectStyles ? styles.autocompleteWrapperClass : ''}
      style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}
    >
      <Autocomplete
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.autocomplete}
      >
        <div style={{ position: 'relative' }}>
          <Input
            value={value}
            onChange={(val) => {
              setValue(val);
              setShowOptions(val.length > 0);
            }}
            onFocus={() => setShowOptions(true)}
            placeholder="Type to search..."
          />
          {showOptions && filteredOptions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                border: '1px solid var(--color-divider)',
                borderRadius: '4px',
                backgroundColor: 'var(--color-surface)',
                zIndex: 1000,
                marginTop: '4px',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {filteredOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setValue(opt);
                    setShowOptions(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--color-divider)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'var(--color-surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'var(--color-surface)';
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </Autocomplete>
    </div>
  );
  //}
}

export function DemoAutocompleteBasicControls() {
  const context = useContext(AutocompleteControlsContext);
  if (!context)
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

  const { injectStyles, setInjectStyles } = context;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={setInjectStyles}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// With Options
export function DemoAutocompleteWithOptions() {
  const [value, setValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <Autocomplete>
        <div style={{ position: 'relative' }}>
          <Input
            value={value}
            onChange={(val) => {
              setValue(val);
              setShowOptions(val.length > 0);
            }}
            onFocus={() => setShowOptions(true)}
            placeholder="Type to search..."
          />
          {showOptions && filteredOptions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                border: '1px solid var(--color-divider)',
                borderRadius: '4px',
                backgroundColor: 'var(--color-surface)',
                zIndex: 1000,
                marginTop: '4px',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {filteredOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setValue(opt);
                    setShowOptions(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--color-divider)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'var(--color-surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'var(--color-surface)';
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </Autocomplete>
    </div>
  );
}
