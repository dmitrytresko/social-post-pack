export interface ImageUploadProps {
  label: string;
  file: File | null;
  onSelect: (file: File | null) => void;
  optional?: boolean;
  disabled?: boolean;
}
