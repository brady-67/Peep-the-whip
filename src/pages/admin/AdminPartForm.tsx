import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ImageUploader from '@/components/admin/ImageUploader';
import Field from '@/components/admin/Field';

const MAX_IMAGES = 10;

interface FormState {
  name: string;
  category: string;
  brand: string;
  price: string;
  stock: 'In Stock' | 'On Order';
  fits: string;
  images: string[];
}

const emptyForm: FormState = {
  name: '',
  category: '',
  brand: '',
  price: '',
  stock: 'In Stock',
  fits: '',
  images: [],
};

export default function AdminPartForm() {
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
      const { data, error } = await supabase.from('parts').select('*').eq('id', id).maybeSingle();
      if (error || !data) {
        setError(error?.message ?? 'Part not found.');
        setLoading(false);
        return;
      }
      setForm({
        name: data.name,
        category: data.category,
        brand: data.brand,
        price: String(data.price),
        stock: data.stock,
        fits: data.fits,
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
      category: form.category.trim(),
      brand: form.brand.trim(),
      price: Number(form.price) || 0,
      stock: form.stock,
      fits: form.fits.trim(),
      images: cleanImages,
    };

    setSaving(true);
    const { error } = isEditing
      ? await supabase.from('parts').update(payload).eq('id', id)
      : await supabase.from('parts').insert(payload);
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }
    navigate('/admin/parts');
  }

  if (loading) {
    return <div className="min-h-screen px-6 pt-28 max-w-3xl mx-auto text-ink/60">Loading…</div>;
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-16 max-w-3xl mx-auto">
      <Link to="/admin/parts" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-bmw-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to parts
      </Link>

      <h1 className="font-display font-extrabold text-3xl text-ink mb-8">
        {isEditing ? 'Edit Part' : 'Add Part'}
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
              placeholder="BMW S55 Downpipes"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <input
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="input"
                placeholder="Exhaust"
              />
            </Field>
            <Field label="Brand">
              <input
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                className="input"
                placeholder="Akrapovic"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (KES)">
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="input"
                placeholder="185000"
              />
            </Field>
            <Field label="Stock Status">
              <select
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value as 'In Stock' | 'On Order' }))}
                className="input"
              >
                <option value="In Stock">In Stock</option>
                <option value="On Order">On Order</option>
              </select>
            </Field>
          </div>

          <Field label="Fits">
            <input
              value={form.fits}
              onChange={(e) => setForm((f) => ({ ...f, fits: e.target.value }))}
              className="input"
              placeholder="BMW M3/M4 G8x"
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
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Part'}
          </button>
          <Link to="/admin/parts" className="btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
