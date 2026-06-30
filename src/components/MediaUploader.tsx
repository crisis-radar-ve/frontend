"use client";

import { useState, useRef, ChangeEvent, DragEvent } from 'react';

interface Props {
  onFilesSelected?: (files: File[]) => void;
}

export default function MediaUploader({ onFilesSelected }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...urls]);
    onFilesSelected?.(fileArray);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const remove = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-crisis-500 bg-crisis-50'
            : 'border-slate-300 hover:border-crisis-300 bg-white'
        }`}
      >
        <p className="text-sm text-slate-600">
          Arrastra fotos aquí o <span className="text-crisis-600 font-medium">haz clic</span> para
          seleccionar
        </p>
        <p className="text-xs text-slate-400 mt-1">
          JPG, PNG, WEBP. Máx. 10 MB por imagen.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onChange}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {previews.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`preview-${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full text-xs hover:bg-black/80"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
