export const uploadCss = `
:root{
  --hc-upload-border: var(--color-border);
  --hc-upload-bg: var(--color-surface);
  --hc-upload-hover: var(--color-surface-hover);
  --hc-upload-muted: var(--color-text-secondary);
  --hc-upload-radius: var(--radius-md);
}

.hcUpload{
  width: 100%;
}

.hcUploadInput{
  display: none;
}

.hcUploadTrigger{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  min-height: unset;
  padding: 0;
  border: none;
  border-radius: var(--hc-upload-radius);
  background: var(--hc-upload-bg);
  cursor: pointer;
  user-select: none;
}

.hcUpload[data-disabled="true"] .hcUploadTrigger{
  opacity: 0.6;
  cursor: not-allowed;
}

.hcUpload[data-dragging="true"] .hcUploadTrigger{
  border-color: var(--color-semantic-primary);
  background: var(--hc-upload-hover);
}

.hcUploadFileList{
  margin-top: var(--spacing-base);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.hcUploadFileGrid{
  margin-top: var(--spacing-base);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.5rem, 1fr));
  gap: 0.5rem;
}

.hcUploadPictureCard{
  position: relative;
  width: 6.5rem;
  height: 6.5rem;
  border: var(--border-width-thin) solid var(--hc-upload-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--hc-upload-bg);
}

.hcUploadPictureCardImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hcUploadPictureCardPlaceholder{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--hc-upload-bg);
}

.hcUploadUploadingOverlay{
  position: absolute;
  inset: 0;
  background: color-mix(in oklab, var(--color-neutral-0) 60%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.hcUploadRemoveButton{
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: none;
  background: color-mix(in oklab, var(--color-neutral-0) 70%, transparent);
  color: var(--color-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.hcUploadFileItemRow{
  display: flex;
  align-items: center;
  gap: var(--spacing-base);
}

.hcUploadThumbnail{
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--hc-upload-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.hcUploadThumbnail img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hcUploadFileMeta{
  flex: 1;
  min-width: 0;
}

.hcUploadFileName{
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hcUploadFileSize{
  font-size: var(--font-size-xs);
  color: var(--hc-upload-muted);
}

.hcUploadIconButton{
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}
`;

