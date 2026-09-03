import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ImageOff, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase, CarRow } from '@/lib/supabase';
import { formatKES } from '@/data/inventory';
import { reorderItem } from '@/lib/reorder';
import AdminNav from '@/components/admin/AdminNav';

export default function AdminDashboard() {
  const [cars, setCars] = useState<CarRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    setLoading(true);
    const { data, error } = await supabase.from('cars').select('*').order('sort_order', { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setCars(data ?? []);
    }
    setLoading(false);
  }

  async function handleMove(index: number, direction: -1 | 1) {
    setReorderingId(cars[index].id);
    const next = await reorderItem('cars', cars, index, direction);
    setCars(next);
    setReorderingId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this car listing? This cannot be undone.')) return;
    setDeletingId(id);
    const { error } = await supabase.from('cars').delete().eq('id', id);
    setDeletingId(null);
    if (error) {
      alert(`Could not delete: ${error.message}`);
      return;
    }
    setCars((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-16 max-w-6xl mx-auto">
      <AdminNav />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-ink">Manage Cars</h1>
          <p className="text-sm text-ink/60">{cars.length} listing{cars.length === 1 ? '' : 's'}</p>
        </div>
        <Link to="/admin/cars/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Add Car
        </Link>
      </div>

      {loading && <p className="text-ink/60">Loading…</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!loading && !error && cars.length === 0 && (
        <div className="glass-card rounded-3xl p-10 text-center text-ink/60">
          No cars yet. Click "Add Car" to create your first listing.
        </div>
      )}

      <div className="grid gap-4">
        {cars.map((car, i) => (
          <div key={car.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
            <div className="flex flex-col gap-1 flex-shrink-0">
              <button
                onClick={() => handleMove(i, -1)}
                disabled={i === 0 || reorderingId !== null}
                className="w-7 h-7 rounded-lg glass flex items-center justify-center text-ink/60 hover:text-bmw-700 disabled:opacity-30 transition-colors"
                aria-label="Move up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMove(i, 1)}
                disabled={i === cars.length - 1 || reorderingId !== null}
                className="w-7 h-7 rounded-lg glass flex items-center justify-center text-ink/60 hover:text-bmw-700 disabled:opacity-30 transition-colors"
                aria-label="Move down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            <div className="w-24 h-16 rounded-xl overflow-hidden bg-bmw-50 flex-shrink-0 flex items-center justify-center">
              {car.images?.[0] ? (
                <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover" />
              ) : (
                <ImageOff className="w-5 h-5 text-bmw-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-ink truncate">{car.name}</h3>
              <p className="text-xs text-ink/50">
                {car.year} · {formatKES(car.price)} · {car.images?.length ?? 0} photo{(car.images?.length ?? 0) === 1 ? '' : 's'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to={`/admin/cars/${car.id}`}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-bmw-700 hover:bg-bmw-50 transition-colors"
                aria-label="Edit"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(car.id)}
                disabled={deletingId === car.id}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
