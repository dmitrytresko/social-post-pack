import { useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';

export function GeneratorSection() {
  const [productFile, setProductFile] = useState<File | null>(null);
  const [reference1, setReference1] = useState<File | null>(null);
  const [reference2, setReference2] = useState<File | null>(null);

  return (
    <section id="generator" aria-label="Upload images" className="mt-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <ImageUpload
          label="Product"
          file={productFile}
          onSelect={setProductFile}
        />
        <ImageUpload
          label="Reference scene"
          file={reference1}
          onSelect={setReference1}
        />
        <ImageUpload
          label="Reference scene"
          file={reference2}
          onSelect={setReference2}
          optional
        />
      </div>
    </section>
  );
}
