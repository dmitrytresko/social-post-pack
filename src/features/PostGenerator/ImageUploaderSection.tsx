import { useState } from 'react';
import { ImageUpload } from '../../components/ImageUpload';
import { Button } from '../../components/Button';

interface ImageUploaderSectionProps {
  onGenerate: (
    productFile: File,
    referenceFiles: File[],
  ) => void | Promise<void>;
  isGenerating: boolean;
  isError: boolean;
}

export function ImageUploaderSection({
  onGenerate,
  isGenerating,
  isError,
}: ImageUploaderSectionProps) {
  const [productFile, setProductFile] = useState<File | null>(null);
  const [reference1, setReference1] = useState<File | null>(null);
  const [reference2, setReference2] = useState<File | null>(null);

  const references = [reference1, reference2].filter(
    (f): f is File => f !== null,
  );
  const canGenerate = productFile !== null && references.length > 0;

  const onSubmit = async () => {
    if (productFile && references.length > 0) {
      await onGenerate(productFile, references);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <ImageUpload
          label="Product"
          file={productFile}
          onSelect={setProductFile}
          disabled={isGenerating}
        />
        <ImageUpload
          label="Reference scene"
          file={reference1}
          onSelect={setReference1}
          disabled={isGenerating}
        />
        <ImageUpload
          optional
          label="Reference scene"
          file={reference2}
          onSelect={setReference2}
          disabled={isGenerating}
        />
      </div>

      <div className="relative mt-8 flex flex-col items-center gap-4">
        <Button
          variant="primary"
          disabled={!canGenerate || isGenerating}
          onClick={onSubmit}
        >
          Generate posts
        </Button>

        {isError && (
          <span className="text-center text-sm text-red-400">
            Could not generate posts. Please try again.
          </span>
        )}
      </div>
    </>
  );
}
