'use client';

import React, { useState, createContext, useContext } from 'react';
import { Upload } from '@repo/ui';
import { Button } from '@repo/ui';
import { Icon } from '@repo/ui';
import {
  Upload as UploadIcon,
  X,
  FileText,
  Image as ImageIcon,
  Download,
} from 'lucide-react';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './upload.demo.css';
import * as buttonStyle from '../button/button.demo.css';

// Upload Controls Context
interface UploadControlsContextType {
  multiple: boolean;
  setMultiple: (multiple: boolean) => void;
  accept: string;
  setAccept: (accept: string) => void;
  maxCount: number | undefined;
  setMaxCount: (maxCount: number | undefined) => void;
  listType: 'text' | 'picture' | 'picture-card';
  setListType: (listType: 'text' | 'picture' | 'picture-card') => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  showFileList: boolean;
  setShowFileList: (showFileList: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const UploadControlsContext = createContext<UploadControlsContextType | null>(
  null,
);

// Provider
export function DemoUploadBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [multiple, setMultiple] = useState(false);
  const [accept, setAccept] = useState('');
  const [maxCount, setMaxCount] = useState<number | undefined>(undefined);
  const [listType, setListType] = useState<'text' | 'picture' | 'picture-card'>(
    'text',
  );
  const [disabled, setDisabled] = useState(false);
  const [showFileList, setShowFileList] = useState(true);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <UploadControlsContext.Provider
      value={{
        multiple,
        setMultiple,
        accept,
        setAccept,
        maxCount,
        setMaxCount,
        listType,
        setListType,
        disabled,
        setDisabled,
        showFileList,
        setShowFileList,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </UploadControlsContext.Provider>
  );
}

// 기본 Upload (컨트롤러와 함께 사용될 컴포넌트)
export function DemoUploadBasicWithControls() {
  const context = useContext(UploadControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    multiple,
    accept,
    maxCount,
    listType,
    disabled,
    showFileList,
    injectStyles,
  } = context;

  const classNames = {
    upload: styles.upload,
    uploadTrigger: styles.uploadTrigger,
    fileList: styles.fileList,
    fileItem: styles.fileItem,
    fileName: styles.fileName,
    fileSize: styles.fileSize,
    removeButton: styles.removeButton,
    ...(listType === 'picture' || listType === 'picture-card'
      ? { thumbnail: styles.thumbnail }
      : {}),
    ...(listType === 'picture-card' ? { pictureCard: styles.pictureCard } : {}),
  };

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.uploadWrapperClass : ''}`}
    >
      <Upload
        multiple={multiple}
        accept={accept || undefined}
        maxCount={maxCount}
        listType={listType}
        disabled={disabled}
        showFileList={showFileList}
        injectStyles={injectStyles}
        classNames={injectStyles ? undefined : classNames}
      >
        <Button
          disabled={disabled}
          className={buttonStyle.demoButton}
          type="primary"
          color="success"
        >
          <Icon icon={UploadIcon} size="small" />
          Click to Upload
        </Button>
      </Upload>
    </div>
  );
}

// Upload Controls
export function DemoUploadBasicControls() {
  const context = useContext(UploadControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    multiple,
    setMultiple,
    accept,
    setAccept,
    maxCount,
    setMaxCount,
    listType,
    setListType,
    disabled,
    setDisabled,
    showFileList,
    setShowFileList,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '다중 파일 (Multiple)',
          control: (
            <Checkbox
              checked={multiple}
              onChange={(checked) => setMultiple(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '파일 타입 (Accept)',
          control: (
            <Input
              type="text"
              value={accept}
              onChange={setAccept}
              placeholder="예: image/*, .pdf"
              size="small"
            />
          ),
        },
        {
          label: '최대 파일 수 (Max Count)',
          control: (
            <Input
              type="number"
              value={maxCount?.toString() ?? ''}
              onChange={(val) => setMaxCount(val ? Number(val) : undefined)}
              placeholder="제한 없음"
              size="small"
            />
          ),
        },
        {
          label: '리스트 타입 (List Type)',
          control: (
            <Select
              options={[
                { label: 'Text', value: 'text' },
                { label: 'Picture', value: 'picture' },
                { label: 'Picture Card', value: 'picture-card' },
              ]}
              value={listType}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setListType(val as typeof listType);
                }
              }}
              placeholder="리스트 타입 선택"
              size="small"
            />
          ),
        },
        {
          label: '비활성화 (Disabled)',
          control: (
            <Checkbox
              checked={disabled}
              onChange={(checked) => setDisabled(checked)}
              size="small"
            >
              비활성화
            </Checkbox>
          ),
        },
        {
          label: '파일 리스트 표시 (Show File List)',
          control: (
            <Checkbox
              checked={showFileList}
              onChange={(checked) => setShowFileList(checked)}
              size="small"
            >
              표시
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
      ]}
    />
  );
}

// 기본 업로드 예제
export function DemoUploadBasic() {
  return (
    <div className={styles.container}>
      <Upload
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
        }}
      >
        <Button
          className={buttonStyle.demoButton}
          type="primary"
          color="success"
        >
          <Icon icon={UploadIcon} size="small" />
          Click to Upload
        </Button>
      </Upload>
    </div>
  );
}

// 드래그 앤 드롭 예제
export function DemoUploadDragDrop() {
  return (
    <div className={styles.container}>
      <Upload
        multiple
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
        }}
      >
        <div className={styles.uploadArea} style={{ textAlign: 'center' }}>
          <Icon icon={UploadIcon} size="large" className={styles.uploadIcon} />
          <p className={styles.uploadText}>
            Click or drag file to this area to upload
          </p>
          <p className={styles.uploadHint}>
            Support for single or bulk upload. Strictly prohibited from
            uploading company data or other band files
          </p>
        </div>
      </Upload>
    </div>
  );
}

// 이미지 업로드 예제
export function DemoUploadImage() {
  return (
    <div className={styles.container}>
      <Upload
        accept="image/*"
        multiple
        listType="picture"
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
          thumbnail: styles.thumbnail,
        }}
      >
        <Button
          className={buttonStyle.demoButton}
          type="primary"
          color="success"
        >
          <Icon icon={ImageIcon} size="small" />
          Click to Upload Image
        </Button>
      </Upload>
    </div>
  );
}

// 다중 파일 업로드 예제
export function DemoUploadMultiple() {
  return (
    <div className={styles.container}>
      <Upload
        multiple
        maxCount={5}
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
        }}
        listType="picture-card"
      >
        <Button
          className={buttonStyle.demoButton}
          type="primary"
          color="success"
        >
          <Icon icon={UploadIcon} size="small" />
          Upload Multiple Files (Max 5)
        </Button>
      </Upload>
    </div>
  );
}

// 파일 크기 제한 예제
export function DemoUploadMaxSize() {
  const [error, setError] = useState<string>('');

  const handleBeforeUpload = (file: File): boolean => {
    setError('');
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError(`File size exceeds 2MB limit: ${file.name}`);
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <Upload
        beforeUpload={handleBeforeUpload}
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
        }}
      >
        <Button
          className={buttonStyle.demoButton}
          type="primary"
          color="success"
        >
          <Icon icon={UploadIcon} size="small" />
          Upload File (Max 2MB)
        </Button>
      </Upload>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

// 커스텀 업로드 트리거 예제
export function DemoUploadCustomTrigger() {
  return (
    <div className={styles.container}>
      <Upload
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
        }}
      >
        <Button
          className={buttonStyle.demoButton}
          type="primary"
          color="success"
        >
          <Icon icon={UploadIcon} size="small" />
          <span>Custom Upload Trigger</span>
        </Button>
      </Upload>
    </div>
  );
}

// Autogenerated file list 예제
export function DemoUploadAutogeneratedFileList() {
  return (
    <div className={styles.container}>
      <Upload
        accept="image/*"
        multiple
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
        }}
      >
        <Button
          className={buttonStyle.demoButton}
          type="primary"
          color="success"
        >
          <Icon icon={UploadIcon} size="small" />
          Click to Upload
        </Button>
      </Upload>
    </div>
  );
}

// Before upload hook 예제
export function DemoUploadBeforeUpload() {
  const [message, setMessage] = useState<string>('');

  const handleBeforeUpload = (file: File): boolean => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      setMessage('You can only upload JPG file!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setMessage('Image must smaller than 2MB!');
      return false;
    }
    setMessage('');
    return true;
  };

  return (
    <div className={styles.container}>
      <Upload
        accept="image/*"
        beforeUpload={handleBeforeUpload}
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
        }}
      >
        <Button>
          <Icon icon={UploadIcon} size="small" />
          Click to Upload (JPG only, max 2MB)
        </Button>
      </Upload>
      {message && <p className={styles.errorMessage}>{message}</p>}
    </div>
  );
}

// Change file on finish 예제
export function DemoUploadChangeOnFinish() {
  const [fileList, setFileList] = useState<any[]>([]);
  const [finishedFiles, setFinishedFiles] = useState<string[]>([]);

  const handleChange = (files: any[]) => {
    setFileList(files);
  };

  const handleFinish = (file: any) => {
    setFinishedFiles((prev) => [...prev, file.name]);
  };

  return (
    <div className={styles.container}>
      <Upload
        onChange={handleChange}
        onFinish={handleFinish}
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
        }}
      >
        <Button>
          <Icon icon={UploadIcon} size="small" />
          Click to Upload
        </Button>
      </Upload>
      {finishedFiles.length > 0 && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500',
              marginBottom: '8px',
            }}
          >
            Finished files:
          </p>
          <ul
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              margin: 0,
              paddingLeft: '20px',
            }}
          >
            {finishedFiles.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Thumbnail file list 예제
export function DemoUploadThumbnail() {
  return (
    <div className={styles.container}>
      <Upload
        accept="image/*"
        multiple
        listType="picture"
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
          thumbnail: styles.thumbnail,
        }}
      >
        <Button
          className={buttonStyle.demoButton}
          type="primary"
          color="success"
        >
          <Icon icon={UploadIcon} size="small" />
          Click to Upload
        </Button>
      </Upload>
    </div>
  );
}

// Pictures wall 예제
export function DemoUploadPicturesWall() {
  return (
    <div className={styles.container}>
      <Upload
        accept="image/*"
        multiple
        listType="picture-card"
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
          pictureCard: styles.pictureCard,
        }}
      >
        <div
          style={{
            width: '104px',
            height: '104px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
          }}
        >
          <Icon icon={UploadIcon} size="medium" />
          <span style={{ marginTop: '8px', fontSize: 'var(--font-size-sm)' }}>
            Upload
          </span>
        </div>
      </Upload>
    </div>
  );
}

// Custom download 예제
export function DemoUploadCustomDownload() {
  const handleDownload = (file: any) => {
    console.log('Downloading:', file.name);
    if (file.originFileObj) {
      const url = URL.createObjectURL(file.originFileObj);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={styles.container}>
      <Upload
        accept="image/*"
        multiple
        listType="picture"
        onDownload={handleDownload}
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
          thumbnail: styles.thumbnail,
        }}
      >
        <Button>
          <Icon icon={UploadIcon} size="small" />
          Click to Upload
        </Button>
      </Upload>
    </div>
  );
}

// Download when finished 예제
export function DemoUploadDownloadWhenFinished() {
  const handleFinish = (file: any) => {
    if (file.originFileObj) {
      const url = URL.createObjectURL(file.originFileObj);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={styles.container}>
      <Upload
        accept="image/*"
        multiple
        listType="picture"
        onFinish={handleFinish}
        classNames={{
          upload: styles.upload,
          uploadTrigger: styles.uploadTrigger,
          fileList: styles.fileList,
          fileItem: styles.fileItem,
          fileName: styles.fileName,
          fileSize: styles.fileSize,
          removeButton: styles.removeButton,
          thumbnail: styles.thumbnail,
        }}
      >
        <Button>
          <Icon icon={UploadIcon} size="small" />
          Click to Upload (Auto download on finish)
        </Button>
      </Upload>
    </div>
  );
}
