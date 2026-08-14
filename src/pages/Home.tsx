import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Truck, Wrench, Hammer, ArrowRight, Search } from 'lucide-react';
import { supabase, CarRow } from '@/lib/supabase';
import { CAR_BRANDS } from '@/data/carBrands';
import CarCard from '@/components/CarCard';

const features = [
  { icon: Car, title: 'Buy & Sell', desc: 'Premium BMW and performance cars, hand-picked and inspected.' },
  { icon: Wrench, title: 'Repairs', desc: 'Full service offering from routine maintenance to major overhauls.' },
  { icon: Hammer, title: 'Customization', desc: 'Build your dream car with us — from classics to new age.' },
  { icon: Truck, title: 'Offroad Rigs', desc: 'Purpose-built offroad vehicles ready for any terrain.' },
];

export default function Home() {
  const [cars, setCars] = useState<CarRow[]>([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [carsError, setCarsError] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
      if (error) {
        setCarsError(error.message);
      } else {
        setCars(data ?? []);
      }
      setCarsLoading(false);
    })();
  }, []);

  const brandOptions = useMemo(() => {
    const fromData = Array.from(new Set(cars.map((c) => c.brand).filter(Boolean)));
    const merged = Array.from(new Set([...CAR_BRANDS.filter((b) => b !== 'Other'), ...fromData]));
    return ['All', ...merged.sort()];
  }, [cars]);

  const filteredCars = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cars.filter((car) => {
      const matchesBrand = brandFilter === 'All' || car.brand === brandFilter;
      const matchesSearch =
        query === '' ||
        car.name.toLowerCase().includes(query) ||
        (car.brand ?? '').toLowerCase().includes(query);
      return matchesBrand && matchesSearch;
    });
  }, [cars, brandFilter, search]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bmw.png"
            alt="Peep The Whip BMW 5 Series"
            className="w-full h-full object-cover"
            style={{ objectPosition: '75% 45%', imageRendering: 'auto' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bmw-900/60 via-bmw-900/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bmw-50 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Nairobi's Premier BMW Dealer</span>
            </div>

            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              Peep The Whip
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light mb-8 max-w-xl animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              From Classics to New Age. We are a group of automotive enthusiasts sharing a passion for cars and motorsports.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <a href="#inventory" className="btn-primary text-base flex items-center gap-2">
                View Our Cars
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link to="/build" className="btn-ghost text-base text-white border-white/30 bg-white/10 hover:bg-white/20">
                Build & Customize
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-10 animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-display font-extrabold text-white">4.4</span>
                  <span className="text-amber-400">★</span>
                </div>
                <p className="text-white/60 text-xs">4,418 Google reviews</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <span className="text-3xl font-display font-extrabold text-white">100+</span>
                <p className="text-white/60 text-xs">Cars delivered</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <span className="text-3xl font-display font-extrabold text-white">15+</span>
                <p className="text-white/60 text-xs">Years experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <div className="glass rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bmw-400 to-bmw-600 flex items-center justify-center mb-3 shadow-lg shadow-bmw-500/20 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-ink mb-1">{f.title}</h3>
              <p className="text-xs text-ink/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inventory */}
      <section id="inventory" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-bmw-500 font-semibold text-sm uppercase tracking-widest">Our Collection</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gradient mt-2 mb-3">
            Cars For Sale
          </h2>
          <p className="text-ink/60 max-w-2xl mx-auto">
            Every car is hand-picked and inspected by our team of BMW enthusiasts. Find your next whip below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="input sm:w-48"
          >
            {brandOptions.map((b) => (
              <option key={b} value={b}>
                {b === 'All' ? 'All Brands' : b}
              </option>
            ))}
          </select>
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any brand or model…"
              className="input pl-10"
            />
          </div>
        </div>

        {carsLoading && <p className="text-center text-ink/50">Loading cars…</p>}
        {carsError && <p className="text-center text-red-600 text-sm">{carsError}</p>}
        {!carsLoading && !carsError && cars.length === 0 && (
          <p className="text-center text-ink/50">No cars listed yet — check back soon.</p>
        )}
        {!carsLoading && !carsError && cars.length > 0 && filteredCars.length === 0 && (
          <p className="text-center text-ink/50">No cars match that search — try a different brand or keyword.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 shimmer-bar animate-shimmer" />
          <div className="relative">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gradient mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-ink/60 mb-8 max-w-xl mx-auto">
              We source cars on order too. Tell us what you want and we'll find it for you — anywhere in East Africa.
            </p>
            <Link to="/build" className="btn-primary inline-flex items-center gap-2 text-base">
              Build With Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
