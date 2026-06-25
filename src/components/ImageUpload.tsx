import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';

interface ImageUploadProps {
  label: string;
  file: File | null;
  onSelect: (file: File | null) => void;
  optional?: boolean;
}

export function ImageUpload({
  label,
  file,
  onSelect,
  optional = false,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onSelectFiles = (files: FileList | null) => {
    const selected = files?.[0];
    if (selected && selected.type.startsWith('image/')) {
      onSelect(selected);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-muted">
        {label}
        {optional && ' (optional)'}
      </span>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          onSelectFiles(e.dataTransfer.files);
        }}
        className={`flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed bg-surface text-center ${
          dragActive ? 'border-accent' : 'border-border'
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-4 text-sm text-muted">
            Drop image or click to browse
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            onSelectFiles(e.target.files);
            e.target.value = '';
          }}
          className="hidden"
        />
      </div>

      {file && (
        <Button
          type="button"
          className="self-start text-xs"
          onClick={() => onSelect(null)}
        >
          Remove
        </Button>
      )}
    </div>
  );
}
