import { supabase } from '@/lib/supabase';

const BUCKET = 'car-images';
const MAX_DIMENSION = 1920; // long edge, in px — plenty sharp for web display
const JPEG_QUALITY = 0.82;

/**
 * Resizes an image in-browser (no crop — full frame, aspect ratio preserved)
 * and re-encodes it as a compressed JPEG. This is what lets you upload
 * full-size, un-edited phone photos and still get a fast upload — a 12MB
 * photo straight off a phone typically comes out under 500KB with no
 * visible quality loss for web display.
 */
async function resizeImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file; // fallback: unsupported format, upload as-is

  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
  );
  return blob ?? file;
}

export async function uploadCarImage(file: File): Promise<string> {
  const optimized = await resizeImage(file);
  const path = `${crypto.randomUUID()}.jpg`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, optimized, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'image/jpeg',
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

