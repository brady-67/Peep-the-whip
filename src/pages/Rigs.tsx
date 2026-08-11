import { useEffect, useState } from 'react';
import { formatKES } from '@/data/inventory';
import { supabase, RigRow } from '@/lib/supabase';
import { Mountain, Wrench, Anchor, ArrowUp, ArrowRight, Truck } from 'lucide-react';

export default function Rigs() {
  const [rigs, setRigs] = useState<RigRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('rigs').select('*').order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setRigs(data ?? []);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/11823963/pexels-photo-11823963.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Offroad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/60 via-amber-800/30 to-bmw-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-50 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6 animate-fade-up">
              <Truck className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 text-sm font-medium">Peep The Rigs</span>
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              Built For The Wild
            </h1>
            <p className="text-xl text-white/80 font-light mb-8 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Purpose-built offroad vehicles ready to conquer any terrain. From mud to rock to expedition trails — we've got the rig for you.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              {['Mud Ready', 'Rock Crawler', 'Expedition', 'Trail Rated'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full glass-dark text-white/90 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rigs grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Offroad Collection</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gradient mt-2 mb-3">
            Rigs For Sale
          </h2>
          <p className="text-ink/60 max-w-2xl mx-auto">
            Each rig is built and tested on real trails. Lift kits, winches, lockers, and mud-terrain rubber — all sorted.
          </p>
        </div>

        {loading && <p className="text-center text-ink/50">Loading rigs…</p>}
        {error && <p className="text-center text-red-600 text-sm">{error}</p>}
        {!loading && !error && rigs.length === 0 && (
          <p className="text-center text-ink/50">No rigs listed yet — check back soon.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rigs.map((rig, i) => (
            <div
              key={rig.id}
              className="glass-card rounded-3xl overflow-hidden group animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={rig.images?.[0] || '/placeholder-car.svg'}
                  alt={rig.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
                {rig.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-semibold shadow-lg">
                    {rig.badge}
                  </span>
                )}
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-amber-700 text-xs font-bold">
                  {rig.year}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-ink mb-1">{rig.name}</h3>
                <p className="text-sm text-ink/50 mb-3">{rig.terrain}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-ink/60">
                    <Mountain className="w-3.5 h-3.5 text-amber-600" />
                    {rig.drivetrain}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ink/60">
                    <ArrowUp className="w-3.5 h-3.5 text-amber-600" />
                    {rig.lift}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ink/60">
                    <Anchor className="w-3.5 h-3.5 text-amber-600" />
                    {rig.winch}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ink/60">
                    <Wrench className="w-3.5 h-3.5 text-amber-600" />
                    Trail Ready
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {rig.specs.map((spec) => (
                    <span key={spec} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-medium">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-amber-100">
                  <div>
                    <span className="text-xs text-ink/40 block">Price</span>
                    <span className="font-display font-extrabold text-xl text-amber-700">{formatKES(rig.price)}</span>
                  </div>
                  <button className="btn-primary text-sm flex items-center gap-1.5">
                    Enquire
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Terrain CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gradient mb-4">
            Need A Custom Build?
          </h2>
          <p className="text-ink/60 mb-8 max-w-xl mx-auto">
            Bring your stock 4x4 and we'll build it into a trail-ready rig. Lift kits, armour, winches, and more.
          </p>
          <a href="/build" className="btn-primary inline-flex items-center gap-2 text-base">
            Start Your Build
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
