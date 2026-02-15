import type { ReactNode } from 'react';

export interface UploadFile {
  uid: string;
  name: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  size?: number;
  type?: string;
  url?: string;
  thumbUrl?: string;
  originFileObj?: File;
  error?: Error;
}

export interface UploadProps {
  injectStyles?: boolean;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxCount?: number;
  defaultFileList?: UploadFile[];
  fileList?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  onFinish?: (file: UploadFile) => void;
  onError?: (file: UploadFile, error: Error) => void;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  customRequest?: (options: { file: File; onProgress: (percent: number) => void; onSuccess: (url: string) => void; onError: (error: Error) => void }) => void;
  onDownload?: (file: UploadFile) => void;
  showFileList?: boolean;
  listType?: 'text' | 'picture' | 'picture-card';
  children?: ReactNode;
  className?: string;
  classNames?: {
    upload?: string;
    uploadTrigger?: string;
    uploadArea?: string;
    fileList?: string;
    fileItem?: string;
    fileName?: string;
    fileSize?: string;
    removeButton?: string;
    thumbnail?: string;
    pictureCard?: string;
  };
}

export interface UseUploadProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxCount?: number;
  defaultFileList?: UploadFile[];
  fileList?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  onFinish?: (file: UploadFile) => void;
  onError?: (file: UploadFile, error: Error) => void;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  customRequest?: (options: { file: File; onProgress: (percent: number) => void; onSuccess: (url: string) => void; onError: (error: Error) => void }) => void;
}

export interface UseUploadReturn {
  fileList: UploadFile[];
  upload: (file: File) => void | Promise<void>;
  remove: (file: UploadFile) => void;
}
