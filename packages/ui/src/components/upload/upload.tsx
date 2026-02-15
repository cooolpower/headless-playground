'use client';

import React, { forwardRef, useState, useRef, useCallback, useId } from 'react';
import { UploadProps, UploadFile } from './type-upload';
import { useUpload } from './use-upload';
import { Icon } from '../icon/icon';
import { X, Download, Image as ImageIcon } from 'lucide-react';
import { uploadCss as _uploadCss } from './upload.styles';

const UploadComponent = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      children,
      className,
      classNames,
      multiple,
      accept,
      disabled,
      maxCount,
      defaultFileList,
      fileList: controlledFileList,
      onChange,
      onFinish,
      onError,
      beforeUpload,
      customRequest,
      onDownload,
      showFileList = true,
      listType = 'text',
      injectStyles = true,
    },
    ref
  ) => {
    const { fileList, upload, remove } = useUpload({
      accept,
      multiple,
      disabled,
      maxCount,
      defaultFileList,
      fileList: controlledFileList,
      onChange,
      onFinish,
      onError,
      beforeUpload,
      customRequest,
    });

    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const uploadId = useId();

    const handleFileSelect = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          for (const file of Array.from(files)) {
            await upload(file);
          }
          // Reset input to allow selecting the same file again
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        }
      },
      [upload]
    );

    const handleClick = useCallback(() => {
      if (!disabled && inputRef.current) {
        inputRef.current.click();
      }
    }, [disabled]);

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragging(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
      async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const files = Array.from(e.dataTransfer.files);
        for (const file of files) {
          await upload(file);
        }
      },
      [disabled, upload]
    );

    const handleDownload = useCallback(
      (file: UploadFile) => {
        if (onDownload) {
          onDownload(file);
        } else if (file.url) {
          window.open(file.url, '_blank');
        } else if (file.originFileObj) {
          const url = URL.createObjectURL(file.originFileObj);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          a.click();
          URL.revokeObjectURL(url);
        }
      },
      [onDownload]
    );

    const renderFileList = () => {
      if (!showFileList || fileList.length === 0) return null;

      if (listType === 'picture-card') {
        return (
          <div className={classNames?.fileList ? `hcUploadFileGrid ${classNames.fileList}` : 'hcUploadFileGrid'}>
            {fileList.map((file) => (
              <div
                key={file.uid}
                className={
                  classNames?.pictureCard
                    ? `hcUploadPictureCard ${classNames.pictureCard}`
                    : 'hcUploadPictureCard'
                }
              >
                {file.thumbUrl || file.url ? (
                  <img
                    src={file.thumbUrl || file.url}
                    alt={file.name}
                    className="hcUploadPictureCardImg"
                  />
                ) : (
                  <div className="hcUploadPictureCardPlaceholder">
                    <Icon icon={ImageIcon} size="medium" />
                  </div>
                )}
                {file.status === 'uploading' && (
                  <div className="hcUploadUploadingOverlay">
                    Uploading...
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => remove(file)}
                  disabled={disabled}
                  className={
                    classNames?.removeButton
                      ? `hcUploadRemoveButton ${classNames.removeButton}`
                      : 'hcUploadRemoveButton'
                  }
                  aria-label={`Remove ${file.name}`}
                >
                  <Icon icon={X} size="small" />
                </button>
              </div>
            ))}
          </div>
        );
      }

      if (listType === 'picture') {
        return (
          <div className={classNames?.fileList ? `hcUploadFileList ${classNames.fileList}` : 'hcUploadFileList'}>
            {fileList.map((file) => (
              <div
                key={file.uid}
                className={classNames?.fileItem ? `hcUploadFileItemRow ${classNames.fileItem}` : 'hcUploadFileItemRow'}
              >
                {file.thumbUrl || file.url ? (
                  <span className={classNames?.thumbnail ? `hcUploadThumbnail ${classNames.thumbnail}` : 'hcUploadThumbnail'}>
                    <img src={file.thumbUrl || file.url} alt={file.name} />
                  </span>
                ) : (
                  <div className={classNames?.thumbnail ? `hcUploadThumbnail ${classNames.thumbnail}` : 'hcUploadThumbnail'}>
                    <Icon icon={ImageIcon} size="small" />
                  </div>
                )}
                <div className="hcUploadFileMeta">
                  <span className={classNames?.fileName ? `hcUploadFileName ${classNames.fileName}` : 'hcUploadFileName'}>
                    {file.name}
                  </span>
                  <span className={classNames?.fileSize ? `hcUploadFileSize ${classNames.fileSize}` : 'hcUploadFileSize'}>
                    {file.size ? `${(file.size / 1024).toFixed(2)} KB` : ''}
                    {file.status === 'uploading' && ' - Uploading...'}
                    {file.status === 'error' && ' - Error'}
                  </span>
                </div>
                {onDownload && (
                  <button
                    type="button"
                    onClick={() => handleDownload(file)}
                    disabled={disabled || file.status !== 'done'}
                    aria-label={`Download ${file.name}`}
                    className="hcUploadIconButton"
                  >
                    <Icon icon={Download} size="small" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(file)}
                  disabled={disabled}
                  className={
                    classNames?.removeButton
                      ? `hcUploadIconButton ${classNames.removeButton}`
                      : 'hcUploadIconButton'
                  }
                  aria-label={`Remove ${file.name}`}
                >
                  <Icon icon={X} size="small" />
                </button>
              </div>
            ))}
          </div>
        );
      }

      // Default: text list
      return (
        <div className={classNames?.fileList ? `hcUploadFileList ${classNames.fileList}` : 'hcUploadFileList'}>
          {fileList.map((file) => (
            <div key={file.uid} className={classNames?.fileItem}>
              <span className={classNames?.fileName}>{file.name}</span>
              <span className={classNames?.fileSize}>
                {file.size ? `(${(file.size / 1024).toFixed(2)} KB)` : ''}
                {file.status === 'uploading' && ' - Uploading...'}
                {file.status === 'error' && ' - Error'}
              </span>
              {onDownload && file.status === 'done' && (
                <button
                  type="button"
                  onClick={() => handleDownload(file)}
                  disabled={disabled}
                  aria-label={`Download ${file.name}`}
                  className="hcUploadIconButton"
                >
                  <Icon icon={Download} size="small" />
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(file)}
                disabled={disabled}
                className={
                  classNames?.removeButton
                    ? `hcUploadIconButton ${classNames.removeButton}`
                    : 'hcUploadIconButton'
                }
                aria-label={`Remove ${file.name}`}
              >
                <Icon icon={X} size="small" />
              </button>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={
          classNames?.upload
            ? className
              ? `hcUpload ${classNames.upload} ${className}`
              : `hcUpload ${classNames.upload}`
            : className
              ? `hcUpload ${className}`
              : 'hcUpload'
        }
        data-disabled={disabled ? 'true' : 'false'}
        data-dragging={isDragging ? 'true' : 'false'}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {injectStyles ? <style suppressHydrationWarning>{_uploadCss}</style> : null}
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileSelect}
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          className="hcUploadInput"
          id={uploadId}
        />
        <div
          onClick={handleClick}
          className={
            classNames?.uploadTrigger
              ? `hcUploadTrigger ${classNames.uploadTrigger}`
              : 'hcUploadTrigger'
          }
        >
          {children || (
            <div>
              <div>📁</div>
              <div>파일을 선택하거나 드래그하세요</div>
            </div>
          )}
        </div>

        {renderFileList()}
      </div>
    );
  }
);

UploadComponent.displayName = 'Upload';

export const Upload = UploadComponent;

export const UploadCss = _uploadCss;
