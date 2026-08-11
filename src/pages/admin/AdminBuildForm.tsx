import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ImageUploader from '@/components/admin/ImageUploader';
import Field from '@/components/admin/Field';

const MAX_IMAGES = 10;

interface FormState {
  name: string;
  year: string;
  basePrice: string;
  buildPrice: string;
  condition: string;
  description: string;
  buildTime: string;
  discount: string;
  images: string[];
}

const emptyForm: FormState = {
  name: '',
  year: String(new Date().getFullYear()),
  basePrice: '',
  buildPrice: '',
  condition: '',
  description: '',
  buildTime: '',
  discount: '',
  images: [],
};

export default function AdminBuildForm() {
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
      const { data, error } = await supabase.from('project_cars').select('*').eq('id', id).maybeSingle();
      if (error || !data) {
        setError(error?.message ?? 'Project car not found.');
        setLoading(false);
        return;
      }
      setForm({
        name: data.name,
        year: String(data.year),
        basePrice: String(data.base_price),
        buildPrice: String(data.build_price),
        condition: data.condition,
        description: data.description,
        buildTime: data.build_time,
        discount: data.discount,
        images: data.images ?? [],
      });
      setLoading(false);
    })();
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanImages = form.images.slice(0, MAX_IMAGES);

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
      base_price: Number(form.basePrice) || 0,
      build_price: Number(form.buildPrice) || 0,
      condition: form.condition.trim(),
      description: form.description.trim(),
      build_time: form.buildTime.trim(),
      discount: form.discount.trim(),
      images: cleanImages,
    };

    setSaving(true);
    const { error } = isEditing
      ? await supabase.from('project_cars').update(payload).eq('id', id)
      : await supabase.from('project_cars').insert(payload);
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }
    navigate('/admin/build');
  }

  if (loading) {
    return <div className="min-h-screen px-6 pt-28 max-w-3xl mx-auto text-ink/60">Loading…</div>;
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-16 max-w-3xl mx-auto">
      <Link to="/admin/build" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-bmw-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to project cars
      </Link>

      <h1 className="font-display font-extrabold text-3xl text-ink mb-8">
        {isEditing ? 'Edit Project Car' : 'Add Project Car'}
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
              placeholder="BMW E30 M3"
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
            <Field label="Condition">
              <input
                value={form.condition}
                onChange={(e) => setForm((f) => ({ ...f, condition: e.target.value }))}
                className="input"
                placeholder="Needs full restoration"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Base Price — car only (KES)">
              <input
                type="number"
                required
                value={form.basePrice}
                onChange={(e) => setForm((f) => ({ ...f, basePrice: e.target.value }))}
                className="input"
                placeholder="2800000"
              />
            </Field>
            <Field label="Build Price — car + build (KES)">
              <input
                type="number"
                required
                value={form.buildPrice}
                onChange={(e) => setForm((f) => ({ ...f, buildPrice: e.target.value }))}
                className="input"
                placeholder="4500000"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Build Time">
              <input
                value={form.buildTime}
                onChange={(e) => setForm((f) => ({ ...f, buildTime: e.target.value }))}
                className="input"
                placeholder="4-6 months"
              />
            </Field>
            <Field label="Discount Badge">
              <input
                value={form.discount}
                onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))}
                className="input"
                placeholder="15% OFF"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="input min-h-[100px] resize-y"
              placeholder="Classic chassis requiring complete engine rebuild..."
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

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Project Car'}
          </button>
          <Link to="/admin/build" className="btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
