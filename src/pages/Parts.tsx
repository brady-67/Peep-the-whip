import { useEffect, useState } from 'react';
import { formatKES } from '@/data/inventory';
import { supabase, PartRow } from '@/lib/supabase';
import { Package, Clock, CheckCircle, ArrowRight, Wrench } from 'lucide-react';

type StockFilter = 'all' | 'In Stock' | 'On Order';

export default function Parts() {
  const [filter, setFilter] = useState<StockFilter>('all');
  const [parts, setParts] = useState<PartRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('parts').select('*').order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setParts(data ?? []);
      }
      setLoading(false);
    })();
  }, []);

  const filtered = filter === 'all' ? parts : parts.filter((p) => p.stock === filter);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/12658309/pexels-photo-12658309.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Parts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bmw-900/70 via-bmw-800/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bmw-50 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6 animate-fade-up">
              <Wrench className="w-4 h-4 text-bmw-300" />
              <span className="text-white/90 text-sm font-medium">Parts Shop</span>
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              German Parts & Offroad Gear
            </h1>
            <p className="text-xl text-white/80 font-light mb-8 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Performance parts for BMW and German cars, plus everything you need for your offroad build. In stock or on order — we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Stock toggle */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gradient mb-2">
              Parts Catalogue
            </h2>
            <p className="text-ink/60">Filter by availability to see what we have ready to go.</p>
          </div>

          <div className="flex gap-2 p-1.5 glass rounded-full">
            {(['all', 'In Stock', 'On Order'] as StockFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-bmw-500 to-bmw-600 text-white shadow-md shadow-bmw-500/30'
                    : 'text-ink/60 hover:text-bmw-700'
                }`}
              >
                {f === 'all' ? 'All Parts' : f}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-center text-ink/50">Loading parts…</p>}
        {error && <p className="text-center text-red-600 text-sm">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-ink/50">No parts listed yet — check back soon.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((part, i) => (
            <div
              key={part.id}
              className="glass-card rounded-3xl overflow-hidden group animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={part.images?.[0] || '/placeholder-car.svg'}
                  alt={part.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bmw-900/30 to-transparent" />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    part.stock === 'In Stock'
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {part.stock === 'In Stock' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {part.stock}
                </span>
              </div>

              <div className="p-5">
                <span className="text-xs text-bmw-500 font-semibold uppercase tracking-wide">{part.category}</span>
                <h3 className="font-display font-bold text-lg text-ink mt-1 mb-1">{part.name}</h3>
                <p className="text-sm text-ink/50 mb-1">by {part.brand}</p>
                <p className="text-xs text-ink/40 mb-4 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  Fits: {part.fits}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-bmw-100">
                  <span className="font-display font-extrabold text-xl text-bmw-700">{formatKES(part.price)}</span>
                  <button className="btn-primary text-sm flex items-center gap-1.5">
                    {part.stock === 'In Stock' ? 'Buy Now' : 'Pre-Order'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info section */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-3xl p-8">
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-display font-bold text-xl text-ink mb-2">In Stock</h3>
            <p className="text-ink/60 text-sm leading-relaxed">
              Parts we have on the shelf, ready for immediate pickup or installation at our Bunyala Rd workshop. Walk in, drive out sorted.
            </p>
          </div>
          <div className="glass-card rounded-3xl p-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-display font-bold text-xl text-ink mb-2">On Order</h3>
            <p className="text-ink/60 text-sm leading-relaxed">
              Parts we source on demand from our trusted suppliers. Place your order and we'll have it in Nairobi within 2-4 weeks. Pre-order to lock in your price.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
