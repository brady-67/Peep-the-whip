import { useState } from 'react';
import { CarRow } from '@/lib/supabase';
import { formatKES } from '@/data/inventory';
import { Gauge, Fuel, Settings, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarCard({ car, index = 0 }: { car: CarRow; index?: number }) {
  const images = car.images?.length > 0 ? car.images : ['/placeholder-car.svg'];
  const [current, setCurrent] = useState(0);

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }

  return (
    <div
      className="glass-card rounded-3xl overflow-hidden group animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={images[current]}
          alt={`${car.name} — photo ${current + 1} of ${images.length}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bmw-900/40 to-transparent" />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-dark flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-dark flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {car.badge && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bmw-500 text-white text-xs font-semibold shadow-lg">
            {car.badge}
          </span>
        )}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-bmw-700 text-xs font-bold">
          {car.year}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-ink mb-1">{car.name}</h3>
        <p className="text-sm text-ink/50 mb-3">{car.engine}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-ink/60">
            <Gauge className="w-3.5 h-3.5 text-bmw-500" />
            {car.mileage}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink/60">
            <Settings className="w-3.5 h-3.5 text-bmw-500" />
            {car.transmission}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink/60">
            <Fuel className="w-3.5 h-3.5 text-bmw-500" />
            {car.fuel}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {car.specs.map((spec) => (
            <span key={spec} className="px-2.5 py-1 rounded-lg bg-bmw-50 text-bmw-700 text-[11px] font-medium">
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-bmw-100">
          <div>
            <span className="text-xs text-ink/40 block">Price</span>
            <span className="font-display font-extrabold text-xl text-bmw-700">{formatKES(car.price)}</span>
          </div>
          <button className="btn-primary text-sm flex items-center gap-1.5">
            Enquire
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
