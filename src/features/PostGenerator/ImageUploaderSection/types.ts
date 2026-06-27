export interface ImageUploaderSectionProps {
  onGenerate: (
    productFile: File,
    referenceFiles: File[],
  ) => void | Promise<void>;
  isGenerating: boolean;
  isError: boolean;
}
