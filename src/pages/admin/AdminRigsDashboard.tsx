import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ImageOff } from 'lucide-react';
import { supabase, RigRow } from '@/lib/supabase';
import { formatKES } from '@/data/inventory';
import AdminNav from '@/components/admin/AdminNav';

export default function AdminRigsDashboard() {
  const [rigs, setRigs] = useState<RigRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadRigs();
  }, []);

  async function loadRigs() {
    setLoading(true);
    const { data, error } = await supabase.from('rigs').select('*').order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setRigs(data ?? []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this rig listing? This cannot be undone.')) return;
    setDeletingId(id);
    const { error } = await supabase.from('rigs').delete().eq('id', id);
    setDeletingId(null);
    if (error) {
      alert(`Could not delete: ${error.message}`);
      return;
    }
    setRigs((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-16 max-w-6xl mx-auto">
      <AdminNav />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-ink">Manage Rigs</h1>
          <p className="text-sm text-ink/60">{rigs.length} listing{rigs.length === 1 ? '' : 's'}</p>
        </div>
        <Link to="/admin/rigs/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Add Rig
        </Link>
      </div>

      {loading && <p className="text-ink/60">Loading…</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!loading && !error && rigs.length === 0 && (
        <div className="glass-card rounded-3xl p-10 text-center text-ink/60">
          No rigs yet. Click "Add Rig" to create your first listing.
        </div>
      )}

      <div className="grid gap-4">
        {rigs.map((rig) => (
          <div key={rig.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
            <div className="w-24 h-16 rounded-xl overflow-hidden bg-bmw-50 flex-shrink-0 flex items-center justify-center">
              {rig.images?.[0] ? (
                <img src={rig.images[0]} alt={rig.name} className="w-full h-full object-cover" />
              ) : (
                <ImageOff className="w-5 h-5 text-bmw-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-ink truncate">{rig.name}</h3>
              <p className="text-xs text-ink/50">
                {rig.year} · {formatKES(rig.price)} · {rig.images?.length ?? 0} photo{(rig.images?.length ?? 0) === 1 ? '' : 's'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to={`/admin/rigs/${rig.id}`}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-bmw-700 hover:bg-bmw-50 transition-colors"
                aria-label="Edit"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(rig.id)}
                disabled={deletingId === rig.id}
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
