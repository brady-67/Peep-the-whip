import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, LogOut, ImageOff } from 'lucide-react';
import { supabase, CarRow } from '@/lib/supabase';
import { formatKES } from '@/data/inventory';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [cars, setCars] = useState<CarRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    setLoading(true);
    const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setCars(data ?? []);
    }
    setLoading(false);
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-ink">Manage Cars</h1>
          <p className="text-sm text-ink/60">{cars.length} listing{cars.length === 1 ? '' : 's'}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/cars/new" className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Car
          </Link>
          <button onClick={logout} className="btn-ghost flex items-center gap-2 text-sm">
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      {loading && <p className="text-ink/60">Loading…</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!loading && !error && cars.length === 0 && (
        <div className="glass-card rounded-3xl p-10 text-center text-ink/60">
          No cars yet. Click "Add Car" to create your first listing.
        </div>
      )}

      <div className="grid gap-4">
        {cars.map((car) => (
          <div key={car.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
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
