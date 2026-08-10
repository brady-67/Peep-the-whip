import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, GripVertical } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
  images: [''],
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
        images: data.images?.length ? data.images : [''],
        specs: data.specs?.length ? data.specs : [''],
      });
      setLoading(false);
    })();
  }, [id]);

  function updateImage(index: number, value: string) {
    setForm((f) => ({ ...f, images: f.images.map((img, i) => (i === index ? value : img)) }));
  }

  function addImage() {
    setForm((f) => (f.images.length >= MAX_IMAGES ? f : { ...f, images: [...f.images, ''] }));
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

    const cleanImages = form.images.map((i) => i.trim()).filter(Boolean).slice(0, MAX_IMAGES);
    const cleanSpecs = form.specs.map((s) => s.trim()).filter(Boolean);

    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }
    if (cleanImages.length === 0) {
      setError('Add at least one image URL.');
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
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-bold text-ink">
              Photos <span className="text-ink/40 font-normal text-sm">({form.images.filter(Boolean).length}/{MAX_IMAGES})</span>
            </h2>
          </div>
          <p className="text-xs text-ink/50 mb-2">Paste image URLs. First photo is the cover shown on the card.</p>

          {form.images.map((img, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => moveImage(i, -1)}
                  disabled={i === 0}
                  className="text-ink/30 hover:text-bmw-500 disabled:opacity-20"
                  aria-label="Move up"
                >
                  <GripVertical className="w-4 h-4" />
                </button>
              </div>
              {img && (
                <img src={img} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-bmw-50" />
              )}
              <input
                value={img}
                onChange={(e) => updateImage(i, e.target.value)}
                className="input flex-1"
                placeholder="https://images.pexels.com/..."
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/40 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {form.images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={addImage}
              className="btn-ghost text-sm flex items-center gap-1.5 mt-2"
            >
              <Plus className="w-4 h-4" />
              Add photo
            </button>
          )}
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
