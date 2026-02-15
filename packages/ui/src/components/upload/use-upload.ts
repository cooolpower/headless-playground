'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { UseUploadProps, UseUploadReturn, UploadFile } from './type-upload';

export function useUpload({
  accept,
  multiple = false,
  disabled = false,
  maxCount,
  defaultFileList = [],
  fileList: controlledFileList,
  onChange,
  onFinish,
  onError,
  beforeUpload,
  customRequest,
}: UseUploadProps): UseUploadReturn {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList);
  const fileList = controlledFileList !== undefined ? controlledFileList : internalFileList;
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (controlledFileList !== undefined) {
      setInternalFileList(controlledFileList);
    }
  }, [controlledFileList]);

  const validateFile = useCallback(
    (file: File): boolean => {
      if (accept) {
        const acceptedTypes = accept.split(',').map((type) => type.trim());
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type);
          }
          if (type.includes('/*')) {
            const baseType = type.split('/')[0];
            return file.type.startsWith(baseType + '/');
          }
          return file.type === type;
        });
        return isAccepted;
      }
      return true;
    },
    [accept]
  );

  const updateFileList = useCallback(
    (newFileList: UploadFile[] | ((prev: UploadFile[]) => UploadFile[])) => {
      if (controlledFileList === undefined) {
        if (typeof newFileList === 'function') {
          setInternalFileList((prev) => {
            const updated = newFileList(prev);
            // Use setTimeout to avoid calling onChange during render
            setTimeout(() => {
              onChangeRef.current?.(updated);
            }, 0);
            return updated;
          });
        } else {
          setInternalFileList(newFileList);
          // Use setTimeout to avoid calling onChange during render
          setTimeout(() => {
            onChangeRef.current?.(newFileList);
          }, 0);
        }
      } else {
        // For controlled component, just call onChange
        if (typeof newFileList === 'function') {
          const updated = newFileList(fileList);
          setTimeout(() => {
            onChangeRef.current?.(updated);
          }, 0);
        } else {
          setTimeout(() => {
            onChangeRef.current?.(newFileList);
          }, 0);
        }
      }
    },
    [controlledFileList, fileList]
  );

  const upload = useCallback(
    async (file: File) => {
      if (disabled) return;

      if (!validateFile(file)) {
        console.warn(`File type not accepted: ${file.type}`);
        return;
      }

      // Before upload hook
      if (beforeUpload) {
        const result = await beforeUpload(file);
        if (result === false) {
          return;
        }
      }

      const fileItem: UploadFile = {
        uid: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        status: 'uploading',
        size: file.size,
        type: file.type,
        originFileObj: file,
      };

      // Use functional update to ensure we always work with the latest state
      updateFileList((prevList) => {
        // Check maxCount with the latest state
        if (maxCount && prevList.length >= maxCount) {
          console.warn(`Maximum file count (${maxCount}) reached`);
          return prevList;
        }
        return [...prevList, fileItem];
      });

      // Custom request or default behavior
      if (customRequest) {
        customRequest({
          file,
          onProgress: (percent) => {
            updateFileList((prevList) =>
              prevList.map((f) =>
                f.uid === fileItem.uid ? { ...f, status: 'uploading' as const } : f
              )
            );
          },
          onSuccess: (url) => {
            updateFileList((prevList) => {
              const updated = prevList.map((f) =>
                f.uid === fileItem.uid ? { ...f, url, status: 'done' as const } : f
              );
              const finishedFile = updated.find((f) => f.uid === fileItem.uid);
              if (finishedFile) {
                onFinish?.(finishedFile);
              }
              return updated;
            });
          },
          onError: (error) => {
            updateFileList((prevList) => {
              const updated = prevList.map((f) =>
                f.uid === fileItem.uid ? { ...f, status: 'error' as const, error } : f
              );
              const errorFile = updated.find((f) => f.uid === fileItem.uid);
              if (errorFile) {
                onError?.(errorFile, error);
              }
              return updated;
            });
          },
        });
      } else {
        // Default: simulate upload completion
        // Generate thumbnail for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const thumbUrl = e.target?.result as string;
            updateFileList((prevList) => {
              const currentFile = prevList.find((f) => f.uid === fileItem.uid);
              if (!currentFile) return prevList;
              
              const updated = prevList.map((f) =>
                f.uid === fileItem.uid ? { ...f, thumbUrl, status: 'done' as const } : f
              );
              const finishedFile = updated.find((f) => f.uid === fileItem.uid);
              if (finishedFile) {
                onFinish?.(finishedFile);
              }
              return updated;
            });
          };
          reader.onerror = () => {
            // If thumbnail generation fails, just mark as done
            updateFileList((prevList) => {
              const updated = prevList.map((f) =>
                f.uid === fileItem.uid ? { ...f, status: 'done' as const } : f
              );
              const finishedFile = updated.find((f) => f.uid === fileItem.uid);
              if (finishedFile) {
                onFinish?.(finishedFile);
              }
              return updated;
            });
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, mark as done immediately
          setTimeout(() => {
            updateFileList((prevList) => {
              const updated = prevList.map((f) =>
                f.uid === fileItem.uid ? { ...f, status: 'done' as const } : f
              );
              const finishedFile = updated.find((f) => f.uid === fileItem.uid);
              if (finishedFile) {
                onFinish?.(finishedFile);
              }
              return updated;
            });
          }, 500);
        }
      }
    },
    [disabled, validateFile, maxCount, updateFileList, beforeUpload, customRequest, onFinish, onError]
  );

  const remove = useCallback(
    (file: UploadFile) => {
      updateFileList((prevList) => prevList.filter((f) => f.uid !== file.uid));
    },
    [updateFileList]
  );

  return {
    fileList,
    upload,
    remove,
  };
}
