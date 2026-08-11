import { useEffect, useState } from 'react';
import { formatKES } from '@/data/inventory';
import { supabase, ProjectCarRow } from '@/lib/supabase';
import { Hammer, Clock, Tag, ArrowRight, CheckCircle, Wrench } from 'lucide-react';

export default function Build() {
  const [projectCars, setProjectCars] = useState<ProjectCarRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('project_cars').select('*').order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setProjectCars(data ?? []);
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
            src="https://images.pexels.com/photos/4489766/pexels-photo-4489766.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Restoration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent-600/60 via-bmw-800/40 to-bmw-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-bmw-50 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6 animate-fade-up">
              <Hammer className="w-4 h-4 text-accent-400" />
              <span className="text-white/90 text-sm font-medium">Build & Customize</span>
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              Build It With Us
            </h1>
            <p className="text-xl text-white/80 font-light mb-8 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              We offer project cars that need rebuilding — and we do it for you at a discounted price when you build with us. From classics to new age, we bring them back to life.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <span className="px-4 py-2 rounded-full glass-dark text-white/90 text-sm font-medium flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-accent-400" />
                Up to 18% off builds
              </span>
              <span className="px-4 py-2 rounded-full glass-dark text-white/90 text-sm font-medium flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-accent-400" />
                Full restoration
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-accent-500 font-semibold text-sm uppercase tracking-widest">The Process</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gradient mt-2 mb-3">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Pick Your Project', desc: 'Choose from our selection of cars that need rebuilding — classics, modern BMWs, and more.' },
            { num: '02', title: 'Plan The Build', desc: 'Sit down with our team to plan the full restoration. Engine, interior, paint — you decide the scope.' },
            { num: '03', title: 'We Build It', desc: 'Our specialists get to work. You get a discounted rate on the build when you commit to us from the start.' },
          ].map((step, i) => (
            <div
              key={i}
              className="glass-card rounded-3xl p-8 relative animate-fade-up"
              style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
            >
              <span className="font-display font-extrabold text-6xl text-bmw-100 absolute top-4 right-6">{step.num}</span>
              <div className="relative">
                <h3 className="font-display font-bold text-xl text-ink mb-2">{step.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project cars */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <span className="text-accent-500 font-semibold text-sm uppercase tracking-widest">Available Projects</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gradient mt-2 mb-3">
            Cars Ready For Rebuilding
          </h2>
          <p className="text-ink/60 max-w-2xl mx-auto">
            These cars need work — and we'll do it for you at a discounted price. Buy the car, build it with us, save on the total.
          </p>
        </div>

        {loading && <p className="text-center text-ink/50">Loading project cars…</p>}
        {error && <p className="text-center text-red-600 text-sm">{error}</p>}
        {!loading && !error && projectCars.length === 0 && (
          <p className="text-center text-ink/50">No project cars listed yet — check back soon.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectCars.map((car, i) => (
            <div
              key={car.id}
              className="glass-card rounded-3xl overflow-hidden group animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={car.images?.[0] || '/placeholder-car.svg'}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bmw-900/40 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-bold shadow-lg">
                  {car.discount}
                </span>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-bmw-700 text-xs font-bold">
                  {car.year}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-ink mb-1">{car.name}</h3>
                <p className="text-xs text-accent-600 font-medium mb-3">{car.condition}</p>

                <p className="text-sm text-ink/60 leading-relaxed mb-4">{car.description}</p>

                <div className="flex items-center gap-4 mb-4 text-xs text-ink/50">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent-500" />
                    {car.build_time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    Discounted build
                  </span>
                </div>

                <div className="space-y-2 pt-3 border-t border-bmw-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink/40">Car only</span>
                    <span className="text-sm font-semibold text-ink/60 line-through">{formatKES(car.base_price)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink/40">Car + Build (with discount)</span>
                    <span className="font-display font-extrabold text-lg text-accent-600">{formatKES(car.build_price)}</span>
                  </div>
                </div>

                <button className="btn-primary w-full mt-4 text-sm flex items-center justify-center gap-1.5">
                  Start This Build
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-10 mt-16">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gradient mb-4">
            Have A Project Car Of Your Own?
          </h2>
          <p className="text-ink/60 mb-8 max-w-xl mx-auto">
            Bring it to us. We'll assess it, plan the build, and bring it back to life — all at a discounted rate when you commit to the full build with us.
          </p>
          <a href="tel:0722507773" className="btn-primary inline-flex items-center gap-2 text-base">
            Call 0722 507773
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
