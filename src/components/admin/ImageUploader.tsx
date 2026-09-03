import { DragEvent, ChangeEvent, useState } from 'react';
import { X, ChevronLeft, ChevronRight, UploadCloud, Loader2 } from 'lucide-react';
import { uploadCarImage } from '@/lib/uploadImage';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
}

export default function ImageUploader({ images, onChange, max = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (list.length === 0) return;

    const room = max - images.length;
    if (room <= 0) {
      setUploadError(`You already have ${max} photos — remove one first.`);
      return;
    }

    const toUpload = list.slice(0, room);
    setUploadError(null);
    setUploading(true);
    setProgress({ done: 0, total: toUpload.length });

    // Uploaded in parallel — each photo is resized/compressed client-side
    // first, so this stays fast even for a full batch straight off a phone.
    const results = await Promise.all(
      toUpload.map((file) =>
        uploadCarImage(file)
          .then((url) => {
            setProgress((p) => ({ ...p, done: p.done + 1 }));
            return { url, error: null as string | null };
          })
          .catch((err) => {
            setProgress((p) => ({ ...p, done: p.done + 1 }));
            return { url: null as string | null, error: err instanceof Error ? err.message : 'Upload failed.' };
          })
      )
    );

    const newUrls = results.filter((r) => r.url).map((r) => r.url as string);
    const firstError = results.find((r) => r.error)?.error;
    if (firstError) setUploadError(firstError);
    if (newUrls.length > 0) onChange([...images, ...newUrls]);

    setUploading(false);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  function onFilePick(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = '';
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function moveImage(index: number, dir: -1 | 1) {
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-display font-bold text-ink">
          Photos <span className="text-ink/40 font-normal text-sm">({images.length}/{max})</span>
        </h2>
      </div>
      <p className="text-xs text-ink/50">
        Drop photos in, or click to browse — upload full, uncropped photos straight from your phone, they're auto-resized and displayed cropped to fit. First photo is the cover shown on the card.
      </p>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={img} className="relative group rounded-xl overflow-hidden aspect-square bg-bmw-50">
              <img src={img} alt="" className="w-full h-full object-cover" />
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-bmw-500 text-white text-[10px] font-semibold">
                  Cover
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => moveImage(i, -1)}
                  disabled={i === 0}
                  className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-ink disabled:opacity-30"
                  aria-label="Move left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-red-600"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(i, 1)}
                  disabled={i === images.length - 1}
                  className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-ink disabled:opacity-30"
                  aria-label="Move right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length < max && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 cursor-pointer transition-colors ${
            dragOver ? 'border-bmw-500 bg-bmw-50' : 'border-bmw-100 hover:border-bmw-300'
          }`}
        >
          <input type="file" accept="image/*" multiple hidden onChange={onFilePick} disabled={uploading} />
          {uploading ? (
            <Loader2 className="w-6 h-6 text-bmw-500 animate-spin" />
          ) : (
            <UploadCloud className="w-6 h-6 text-bmw-400" />
          )}
          <p className="text-sm text-ink/60">
            {uploading ? `Uploading ${progress.done}/${progress.total}…` : 'Drop photos here or click to browse'}
          </p>
          <p className="text-xs text-ink/40">Up to {max - images.length} more</p>
        </label>
      )}

      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
    </div>
  );
}
