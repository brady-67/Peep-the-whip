import { useEffect, useState, FormEvent, DragEvent, ChangeEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, ChevronLeft, ChevronRight, UploadCloud, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadCarImage } from '@/lib/uploadImage';

const MAX_IMAGES = 10;

interface FormState {
  name: string;
  year: string;
  price: string;
  mileage: string;
  transmission: string;
  fuel: string;
  engine: string;
  badge: string;
  images: string[];
  specs: string[];
}

const emptyForm: FormState = {
  name: '',
  year: String(new Date().getFullYear()),
  price: '',
  mileage: '',
  transmission: 'Automatic',
  fuel: 'Petrol',
  engine: '',
  badge: '',
  images: [],
  specs: [''],
};

export default function AdminCarForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase.from('cars').select('*').eq('id', id).maybeSingle();
      if (error || !data) {
        setError(error?.message ?? 'Car not found.');
        setLoading(false);
        return;
      }
      setForm({
        name: data.name,
        year: String(data.year),
        price: String(data.price),
        mileage: data.mileage,
        transmission: data.transmission,
        fuel: data.fuel,
        engine: data.engine,
        badge: data.badge ?? '',
        images: data.images ?? [],
        specs: data.specs?.length ? data.specs : [''],
      });
      setLoading(false);
    })();
  }, [id]);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (list.length === 0) return;

    const room = MAX_IMAGES - form.images.length;
    if (room <= 0) {
      setUploadError(`You already have ${MAX_IMAGES} photos — remove one first.`);
      return;
    }

    const toUpload = list.slice(0, room);
    setUploadError(null);
    setUploading(true);

    for (const file of toUpload) {
      try {
        const url = await uploadCarImage(file);
        setForm((f) => ({ ...f, images: [...f.images, url] }));
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Upload failed.');
      }
    }

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
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  }

  function moveImage(index: number, dir: -1 | 1) {
    setForm((f) => {
      const next = [...f.images];
      const target = index + dir;
      if (target < 0 || target >= next.length) return f;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...f, images: next };
    });
  }

  function updateSpec(index: number, value: string) {
    setForm((f) => ({ ...f, specs: f.specs.map((s, i) => (i === index ? value : s)) }));
  }

  function addSpec() {
    setForm((f) => ({ ...f, specs: [...f.specs, ''] }));
  }

  function removeSpec(index: number) {
    setForm((f) => ({ ...f, specs: f.specs.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanImages = form.images.slice(0, MAX_IMAGES);
    const cleanSpecs = form.specs.map((s) => s.trim()).filter(Boolean);

    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }
    if (cleanImages.length === 0) {
      setError('Add at least one photo.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      year: Number(form.year) || new Date().getFullYear(),
      price: Number(form.price) || 0,
      mileage: form.mileage.trim(),
      transmission: form.transmission.trim(),
      fuel: form.fuel.trim(),
      engine: form.engine.trim(),
      badge: form.badge.trim() || null,
      images: cleanImages,
      specs: cleanSpecs,
    };

    setSaving(true);
    const { error } = isEditing
      ? await supabase.from('cars').update(payload).eq('id', id)
      : await supabase.from('cars').insert(payload);
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }
    navigate('/admin');
  }

  if (loading) {
    return <div className="min-h-screen px-6 pt-28 max-w-3xl mx-auto text-ink/60">Loading…</div>;
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-16 max-w-3xl mx-auto">
      <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-bmw-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      <h1 className="font-display font-extrabold text-3xl text-ink mb-8">
        {isEditing ? 'Edit Car' : 'Add Car'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic details */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <h2 className="font-display font-bold text-ink mb-2">Details</h2>

          <Field label="Name">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="input"
              placeholder="BMW M5 F90 Competition"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Year">
              <input
                type="number"
                required
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                className="input"
              />
            </Field>
            <Field label="Price (KES)">
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="input"
                placeholder="12500000"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Mileage">
              <input
                value={form.mileage}
                onChange={(e) => setForm((f) => ({ ...f, mileage: e.target.value }))}
                className="input"
                placeholder="18,000 km"
              />
            </Field>
            <Field label="Badge (optional)">
              <input
                value={form.badge}
                onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                className="input"
                placeholder="Featured"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Transmission">
              <input
                value={form.transmission}
                onChange={(e) => setForm((f) => ({ ...f, transmission: e.target.value }))}
                className="input"
              />
            </Field>
            <Field label="Fuel">
              <input
                value={form.fuel}
                onChange={(e) => setForm((f) => ({ ...f, fuel: e.target.value }))}
                className="input"
              />
            </Field>
          </div>

          <Field label="Engine">
            <input
              value={form.engine}
              onChange={(e) => setForm((f) => ({ ...f, engine: e.target.value }))}
              className="input"
              placeholder="4.4L V8 Twin-Turbo"
            />
          </Field>
        </div>

        {/* Images */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-display font-bold text-ink">
              Photos <span className="text-ink/40 font-normal text-sm">({form.images.length}/{MAX_IMAGES})</span>
            </h2>
          </div>
          <p className="text-xs text-ink/50">Drop photos in, or click to browse. First photo is the cover shown on the card.</p>

          {form.images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {form.images.map((img, i) => (
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
                      disabled={i === form.images.length - 1}
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

          {form.images.length < MAX_IMAGES && (
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
                {uploading ? 'Uploading…' : 'Drop photos here or click to browse'}
              </p>
              <p className="text-xs text-ink/40">Up to {MAX_IMAGES - form.images.length} more</p>
            </label>
          )}

          {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
        </div>

        {/* Specs */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <h2 className="font-display font-bold text-ink mb-2">Spec Highlights</h2>
          {form.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={spec}
                onChange={(e) => updateSpec(i, e.target.value)}
                className="input flex-1"
                placeholder="625 HP"
              />
              <button
                type="button"
                onClick={() => removeSpec(i)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/40 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                aria-label="Remove spec"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={addSpec} className="btn-ghost text-sm flex items-center gap-1.5 mt-2">
            <Plus className="w-4 h-4" />
            Add spec
          </button>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Car'}
          </button>
          <Link to="/admin" className="btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-ink/60 block mb-1">{label}</label>
      {children}
    </div>
  );
}
