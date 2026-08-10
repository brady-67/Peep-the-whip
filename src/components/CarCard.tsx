import { Car } from '@/data/inventory';
import { formatKES } from '@/data/inventory';
import { Gauge, Fuel, Settings, Cog, ArrowRight } from 'lucide-react';

export default function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  return (
    <div
      className="glass-card rounded-3xl overflow-hidden group animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bmw-900/40 to-transparent" />
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
