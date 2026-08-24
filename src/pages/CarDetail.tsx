import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, CarRow } from '@/lib/supabase';
import { formatKES } from '@/data/inventory';
import { buildEnquiryLink } from '@/lib/enquiry';
import { ArrowLeft, ChevronLeft, ChevronRight, Gauge, Fuel, Settings, Wrench, ArrowRight } from 'lucide-react';
import SoldRibbon from '@/components/SoldRibbon';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<CarRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.from('cars').select('*').eq('id', id).maybeSingle();
      if (error || !data) {
        setError(error?.message ?? 'Car not found.');
      } else {
        setCar(data);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen pt-32 px-6 text-center text-ink/60">Loading…</div>;
  }

  if (error || !car) {
    return (
      <div className="min-h-screen pt-32 px-6 text-center">
        <p className="text-ink/60 mb-4">{error ?? 'Car not found.'}</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>
      </div>
    );
  }

  const images = car.images?.length > 0 ? car.images : ['/placeholder-car.svg'];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-bmw-700 mt-6 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-3">
          <div className="relative rounded-3xl overflow-hidden glass-card aspect-[4/3]">
            <img
              src={images[current]}
              alt={`${car.name} — photo ${current + 1} of ${images.length}`}
              className="w-full h-full object-cover"
            />
            {car.badge?.toLowerCase() === 'sold' ? (
              <SoldRibbon />
            ) : (
              car.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bmw-500 text-white text-xs font-semibold shadow-lg">
                  {car.badge}
                </span>
              )
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Show photo ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setCurrent(i)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-colors ${
                    i === current ? 'border-bmw-500' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-6 lg:sticky lg:top-24">
            {car.brand && (
              <span className="text-xs text-bmw-500 font-semibold uppercase tracking-wide">{car.brand}</span>
            )}
            <h1 className="font-display font-extrabold text-3xl text-ink mt-1 mb-1">{car.name}</h1>
            <p className="text-ink/50 mb-4">{car.year} · {car.engine}</p>

            <span className="font-display font-extrabold text-3xl text-bmw-700 block mb-6">
              {formatKES(car.price)}
            </span>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center">
                <Gauge className="w-5 h-5 text-bmw-500 mx-auto mb-1" />
                <p className="text-xs text-ink/60">{car.mileage}</p>
              </div>
              <div className="text-center">
                <Settings className="w-5 h-5 text-bmw-500 mx-auto mb-1" />
                <p className="text-xs text-ink/60">{car.transmission}</p>
              </div>
              <div className="text-center">
                <Fuel className="w-5 h-5 text-bmw-500 mx-auto mb-1" />
                <p className="text-xs text-ink/60">{car.fuel}</p>
              </div>
            </div>

            {car.specs?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {car.specs.map((spec) => (
                  <span key={spec} className="px-2.5 py-1 rounded-lg bg-bmw-50 text-bmw-700 text-[11px] font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            )}

            {car.description && (
              <div className="mb-6 pt-4 border-t border-bmw-100">
                <h2 className="font-display font-bold text-sm text-ink mb-2 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-bmw-500" />
                  About This Car
                </h2>
                <p className="text-sm text-ink/60 leading-relaxed">{car.description}</p>
              </div>
            )}

            <a
              href={buildEnquiryLink(car.name, formatKES(car.price))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center flex items-center gap-2 text-base"
            >
              Enquire on WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
