'use client';

import { createContext, useContext, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@repo/ui';
import { Input } from '@repo/ui';
import { Textarea } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Button } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './card.demo.css';
import * as buttonStyles from '../button/button.demo.css';

// Card Controls Context
interface CardControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  showHeader: boolean;
  setShowHeader: (show: boolean) => void;
  showFooter: boolean;
  setShowFooter: (show: boolean) => void;
  clickable: boolean;
  setClickable: (clickable: boolean) => void;
}

const CardControlsContext = createContext<CardControlsContextType | null>(null);

// Provider
export function DemoCardBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [title, setTitle] = useState('Card Title');
  const [content, setContent] = useState(
    'This is the card content. You can customize it through the controls.',
  );
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [clickable, setClickable] = useState(false);

  return (
    <CardControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        title,
        setTitle,
        content,
        setContent,
        showHeader,
        setShowHeader,
        showFooter,
        setShowFooter,
        clickable,
        setClickable,
      }}
    >
      {children}
    </CardControlsContext.Provider>
  );
}

// 기본 Card (컨트롤러와 함께 사용될 컴포넌트)
export function DemoCardBasicWithControls() {
  const context = useContext(CardControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, title, content, showHeader, showFooter, clickable } =
    context;

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.cardWrapperClass : ''}`}
    >
      <div className={styles.cardWrapper}>
        <Card
          injectStyles={injectStyles}
          onClick={
            clickable && !showFooter ? () => alert('Card clicked!') : undefined
          }
        >
          {showHeader && (
            <CardHeader>
              <h4 className={styles.cardTitle}>{title}</h4>
            </CardHeader>
          )}
          <CardContent>
            <p className={styles.cardText}>{content}</p>
          </CardContent>
          {showFooter && (
            <CardFooter>
              <div className={styles.cardActions}>
                <Button
                  type="secondary"
                  color="error"
                  className={buttonStyles.demoButton}
                  onClick={() => alert('Cancel clicked!')}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  color="success"
                  className={buttonStyles.demoButton}
                  onClick={() => alert('Confirm clicked!')}
                >
                  Confirm
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}

// Card Controls
export function DemoCardBasicControls() {
  const context = useContext(CardControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    title,
    setTitle,
    content,
    setContent,
    showHeader,
    setShowHeader,
    showFooter,
    setShowFooter,
    clickable,
    setClickable,
  } = context;

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
              사용
            </Checkbox>
          ),
        },
        {
          label: '제목 (Title)',
          control: (
            <Input
              type="text"
              value={title}
              onChange={setTitle}
              placeholder="제목 텍스트"
              size="small"
            />
          ),
        },
        {
          label: '내용 (Content)',
          control: (
            <Textarea
              value={content}
              onChange={setContent}
              rows={3}
              placeholder="내용 텍스트"
              size="small"
            />
          ),
        },
        {
          label: '헤더 표시 (Show Header)',
          control: (
            <Checkbox
              checked={showHeader}
              onChange={(checked) => setShowHeader(checked)}
              size="small"
            >
              표시
            </Checkbox>
          ),
        },
        {
          label: '푸터 표시 (Show Footer)',
          control: (
            <Checkbox
              checked={showFooter}
              onChange={(checked) => setShowFooter(checked)}
              size="small"
            >
              표시
            </Checkbox>
          ),
        },
        {
          label: '클릭 가능 (Clickable)',
          control: (
            <Checkbox
              disabled={showFooter ? true : false}
              checked={clickable}
              onChange={(checked) => setClickable(checked)}
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

// Basic Card Demo
export function DemoCardBasic() {
  return (
    <div className={styles.section}>
      <div className={styles.cardWrapper}>
        <Card>
          <CardHeader>
            <h4 className={styles.cardTitle}>Basic Card</h4>
          </CardHeader>
          <CardContent>
            <p className={styles.cardText}>
              This is a basic card with header, content, and footer sections.
              The card provides structural layout without any visual styling.
            </p>
          </CardContent>
          <CardFooter>
            <div className={styles.cardActions}>
              <Button
                type="secondary"
                color="error"
                className={buttonStyles.demoButton}
                onClick={() => {}}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                color="success"
                className={buttonStyles.demoButton}
                onClick={() => {}}
              >
                Confirm
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Interactive Card Demo
export function DemoCardInteractive() {
  return (
    <div className={styles.section}>
      <div className={styles.cardWrapper}>
        <Card onClick={() => alert('Card clicked!')}>
          <CardHeader>
            <h4 className={styles.cardTitle}>Interactive Card</h4>
          </CardHeader>
          <CardContent>
            <p className={styles.cardText}>
              This card is clickable. Click anywhere on the card to trigger an
              action. The cursor changes to indicate interactivity.
            </p>
          </CardContent>
          <CardFooter>
            <span className={styles.clickHint}>Click me!</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Minimal Card Demo
export function DemoCardMinimal() {
  return (
    <div className={styles.section}>
      <div className={styles.cardWrapper}>
        <Card>
          <CardContent>
            <p className={styles.cardText}>
              Sometimes you only need content without header or footer. The card
              component is flexible enough to accommodate various layouts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function DemoCard() {
  return (
    <div className={styles.demoContainer}>
      <h3 className={styles.demoTitle}>Card Variants</h3>
    </div>
  );
}

export function CardControls() {
  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Cards provide structural layout for content organization. Click the
        interactive card to see the click behavior.
      </p>
    </div>
  );
}
