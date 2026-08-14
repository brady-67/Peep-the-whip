import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ImageUploader from '@/components/admin/ImageUploader';
import Field from '@/components/admin/Field';

const MAX_IMAGES = 10;

interface FormState {
  name: string;
  year: string;
  price: string;
  terrain: string;
  drivetrain: string;
  badge: string;
  images: string[];
  specs: string[];
}

const emptyForm: FormState = {
  name: '',
  year: String(new Date().getFullYear()),
  price: '',
  terrain: '',
  drivetrain: '4WD',
  badge: '',
  images: [],
  specs: [''],
};

export default function AdminRigForm() {
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
      const { data, error } = await supabase.from('rigs').select('*').eq('id', id).maybeSingle();
      if (error || !data) {
        setError(error?.message ?? 'Rig not found.');
        setLoading(false);
        return;
      }
      setForm({
        name: data.name,
        year: String(data.year),
        price: String(data.price),
        terrain: data.terrain,
        drivetrain: data.drivetrain,
        badge: data.badge ?? '',
        images: data.images ?? [],
        specs: data.specs?.length ? data.specs : [''],
      });
      setLoading(false);
    })();
  }, [id]);

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
      terrain: form.terrain.trim(),
      drivetrain: form.drivetrain.trim(),
      badge: form.badge.trim() || null,
      images: cleanImages,
      specs: cleanSpecs,
    };

    setSaving(true);
    const { error } = isEditing
      ? await supabase.from('rigs').update(payload).eq('id', id)
      : await supabase.from('rigs').insert(payload);
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }
    navigate('/admin/rigs');
  }

  if (loading) {
    return <div className="min-h-screen px-6 pt-28 max-w-3xl mx-auto text-ink/60">Loading…</div>;
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-16 max-w-3xl mx-auto">
      <Link to="/admin/rigs" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-bmw-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to rigs
      </Link>

      <h1 className="font-display font-extrabold text-3xl text-ink mb-8">
        {isEditing ? 'Edit Rig' : 'Add Rig'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <h2 className="font-display font-bold text-ink mb-2">Details</h2>

          <Field label="Name">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="input"
              placeholder="Land Rover Defender 110"
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
                placeholder="15500000"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Terrain">
              <input
                value={form.terrain}
                onChange={(e) => setForm((f) => ({ ...f, terrain: e.target.value }))}
                className="input"
                placeholder="All-Terrain"
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

          <Field label="Drivetrain">
            <input
              value={form.drivetrain}
              onChange={(e) => setForm((f) => ({ ...f, drivetrain: e.target.value }))}
              className="input"
              placeholder="4WD"
            />
          </Field>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <ImageUploader
            images={form.images}
            onChange={(images) => setForm((f) => ({ ...f, images }))}
            max={MAX_IMAGES}
          />
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3">
          <h2 className="font-display font-bold text-ink mb-2">Spec Highlights</h2>
          {form.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={spec}
                onChange={(e) => updateSpec(i, e.target.value)}
                className="input flex-1"
                placeholder="3.0L V6 Diesel"
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
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Rig'}
          </button>
          <Link to="/admin/rigs" className="btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
