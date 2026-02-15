'use client';

import { useState, createContext, useContext } from 'react';
import { Modal } from '@repo/ui';
import { Input } from '@repo/ui';
import { Textarea } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Button } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './modal.demo.css';

// Modal Controls Context
interface ModalControlsContextType {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  width: number | string;
  setWidth: (width: number | string) => void;
  closable: boolean;
  setClosable: (closable: boolean) => void;
  maskClosable: boolean;
  setMaskClosable: (maskClosable: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const ModalControlsContext = createContext<ModalControlsContextType | null>(
  null,
);

// Provider
export function DemoModalBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState('Modal Title');
  const [content, setContent] = useState(
    'This is the modal content. You can customize it through the controls.',
  );
  const [width, setWidth] = useState<number | string>(520);
  const [closable, setClosable] = useState(true);
  const [maskClosable, setMaskClosable] = useState(true);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <ModalControlsContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        width,
        setWidth,
        closable,
        setClosable,
        maskClosable,
        setMaskClosable,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </ModalControlsContext.Provider>
  );
}

// 기본 Modal (컨트롤러와 함께 사용될 컴포넌트)
export function DemoModalBasicWithControls() {
  const context = useContext(ModalControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { title, content, width, closable, maskClosable } = context;
  const { injectStyles } = context;
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.modalWrapperClass : ''}`}
    >
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title={title}
        width={width}
        closable={closable}
        maskClosable={maskClosable}
        injectStyles={injectStyles}
      >
        <div className={styles.content}>
          <p>{content}</p>
          <div className={styles.actions}>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Modal Controls
export function DemoModalBasicControls() {
  const context = useContext(ModalControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    title,
    setTitle,
    content,
    setContent,
    width,
    setWidth,
    closable,
    setClosable,
    maskClosable,
    setMaskClosable,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
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
          label: '너비 (Width)',
          control: (
            <Input
              type="text"
              value={String(width)}
              onChange={(val) => {
                if (val === '') {
                  setWidth('');
                } else if (!isNaN(Number(val))) {
                  setWidth(Number(val));
                } else {
                  setWidth(val);
                }
              }}
              placeholder="520 또는 50%"
              size="small"
            />
          ),
        },
        {
          label: '닫기 버튼 (Closable)',
          control: (
            <Checkbox
              checked={closable}
              onChange={(checked) => setClosable(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
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
        {
          label: '마스크 클릭 닫기 (Mask Closable)',
          control: (
            <Checkbox
              checked={maskClosable}
              onChange={(checked) => setMaskClosable(checked)}
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

export function DemoModalBasic() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(true)} className={styles.button}>
        Open Basic Modal
      </button>

      <Modal open={open} onOpenChange={setOpen} title="Basic Modal">
        <div className={styles.content}>
          <p>This is a basic modal dialog. You can put any content here.</p>
          <div className={styles.actions}>
            <button
              onClick={() => setOpen(false)}
              className={styles.buttonSecondary}
            >
              Close
            </button>
            <button onClick={() => setOpen(false)} className={styles.button}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function DemoModalConfirm() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    alert('Item deleted!');
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(true)} className={styles.buttonDanger}>
        Delete Item
      </button>

      <Modal open={open} onOpenChange={setOpen} title="Confirm Deletion">
        <div className={styles.content}>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className={styles.actions}>
            <button
              onClick={() => setOpen(false)}
              className={styles.buttonSecondary}
            >
              Cancel
            </button>
            <button onClick={handleDelete} className={styles.buttonDanger}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function DemoModalLarge() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated!');
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(true)} className={styles.buttonSuccess}>
        Edit Profile
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Edit Profile"
        width={600}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>First Name</label>
              <Input type="text" placeholder="John" required size="small" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Last Name</label>
              <Input type="text" placeholder="Doe" required size="small" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <Input
              type="email"
              placeholder="john@example.com"
              required
              size="small"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bio</label>
            <Textarea
              placeholder="Tell us about yourself..."
              rows={3}
              size="small"
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-divider)',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={styles.buttonSecondary}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export function DemoModalTypes() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.gridTwoColumns}>
        <button onClick={() => setInfoOpen(true)} className={styles.button}>
          Info Modal
        </button>
        <button
          onClick={() => setSuccessOpen(true)}
          className={styles.buttonSuccess}
        >
          Success Modal
        </button>
        <button
          onClick={() => setWarningOpen(true)}
          className={styles.buttonWarning}
        >
          Warning Modal
        </button>
        <button
          onClick={() => setErrorOpen(true)}
          className={styles.buttonDanger}
        >
          Error Modal
        </button>
      </div>

      <Modal open={infoOpen} onOpenChange={setInfoOpen} title="Information">
        <div className={styles.content}>
          <p style={{ color: 'var(--color-semantic-info)' }}>
            ℹ️ This is an informational message.
          </p>
          <div className={styles.actions}>
            <button
              onClick={() => setInfoOpen(false)}
              className={styles.button}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={successOpen} onOpenChange={setSuccessOpen} title="Success!">
        <div className={styles.content}>
          <p style={{ color: 'var(--color-semantic-success)' }}>
            ✅ Operation completed successfully.
          </p>
          <div className={styles.actions}>
            <button
              onClick={() => setSuccessOpen(false)}
              className={styles.buttonSuccess}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={warningOpen} onOpenChange={setWarningOpen} title="Warning">
        <div className={styles.content}>
          <p style={{ color: 'var(--color-semantic-warning)' }}>
            ⚠️ Please be careful with this action.
          </p>
          <div className={styles.actions}>
            <button
              onClick={() => setWarningOpen(false)}
              className={styles.buttonSecondary}
            >
              Cancel
            </button>
            <button
              onClick={() => setWarningOpen(false)}
              className={styles.buttonWarning}
            >
              Proceed
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={errorOpen} onOpenChange={setErrorOpen} title="Error">
        <div className={styles.content}>
          <p style={{ color: 'var(--color-semantic-error)' }}>
            ❌ Something went wrong. Please try again.
          </p>
          <div className={styles.actions}>
            <button
              onClick={() => setErrorOpen(false)}
              className={styles.buttonDanger}
            >
              Try Again
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function DemoModalCustomFooter() {
  const [open, setOpen] = useState(false);

  const handlePrimary = () => {
    alert('Primary action executed!');
    setOpen(false);
  };

  const handleSecondary = () => {
    alert('Secondary action executed!');
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(true)} className={styles.buttonPrimary}>
        Custom Footer Modal
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Custom Footer Modal"
        footer={
          <div className={styles.footerBetween}>
            <button
              onClick={handleSecondary}
              className={styles.buttonSecondary}
            >
              Secondary Action
            </button>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => setOpen(false)}
                className={styles.buttonSecondary}
              >
                Cancel
              </button>
              <button onClick={handlePrimary} className={styles.button}>
                Primary Action
              </button>
            </div>
          </div>
        }
      >
        <p>
          This modal demonstrates a custom footer with multiple action buttons
          arranged in different positions.
        </p>
      </Modal>
    </div>
  );
}

export function DemoModalNoFooter() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)} className={styles.buttonIndigo}>
        No Footer Modal
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="No Footer Modal"
        footer={null}
      >
        <div className={styles.spaceY}>
          <p>This modal has no footer. You can only close it using:</p>
          <ul className={styles.list}>
            <li>The close button (X) in the top-right corner</li>
            <li>Clicking outside the modal (mask click)</li>
            <li>Pressing the ESC key</li>
          </ul>
          <div className="pt-4">
            <button
              onClick={() => setOpen(false)}
              className={styles.buttonIndigo}
            >
              Close Modal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function DemoModalCentered() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)} className={styles.buttonTeal}>
        Centered Modal
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Centered Modal"
        centered
        width={400}
      >
        <div className={styles.spaceY}>
          <p>
            This modal is perfectly centered both horizontally and vertically on
            the screen.
          </p>
          <p className={styles.textMuted}>
            The <code className={styles.code}>centered</code> prop centers the
            modal in the viewport, which is useful for important messages or
            confirmations.
          </p>
          <div className={styles.flexEnd}>
            <button
              onClick={() => setOpen(false)}
              className={styles.buttonTeal}
            >
              Got it!
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function DemoModalCustomWidth() {
  const [smallOpen, setSmallOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);

  return (
    <div className={styles.spaceY}>
      <div className={styles.flexGap}>
        <button
          onClick={() => setSmallOpen(true)}
          className={styles.buttonOrange}
        >
          Small Modal (300px)
        </button>
        <button
          onClick={() => setLargeOpen(true)}
          className={styles.buttonPink}
        >
          Large Modal (900px)
        </button>
      </div>

      <Modal
        open={smallOpen}
        onOpenChange={setSmallOpen}
        title="Small Modal"
        width={300}
      >
        <div className={styles.spaceY}>
          <p>This is a compact modal with a width of 300px.</p>
          <p className={styles.textMuted}>
            Perfect for simple messages or confirmations.
          </p>
          <div className={styles.flexEnd}>
            <button
              onClick={() => setSmallOpen(false)}
              className={styles.buttonOrange}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={largeOpen}
        onOpenChange={setLargeOpen}
        title="Extra Large Modal"
        width={900}
      >
        <div className={styles.spaceYLarge}>
          <p>
            This modal has a width of 900px, providing plenty of space for
            complex content.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Column 1</h4>
              <p className={styles.textMuted}>
                Large modals are ideal for forms, detailed information, or
                multi-step processes. They provide ample space for various UI
                elements and content.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Column 2</h4>
              <p className={styles.textMuted}>
                You can customize the width using the{' '}
                <code className={styles.code}>width</code> prop, which accepts
                both numbers (pixels) and strings.
              </p>
            </div>
          </div>

          <div className={styles.flexEndGap}>
            <button
              onClick={() => setLargeOpen(false)}
              className={styles.buttonSecondary}
            >
              Cancel
            </button>
            <button
              onClick={() => setLargeOpen(false)}
              className={styles.buttonPink}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
