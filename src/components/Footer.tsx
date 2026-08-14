import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { formatKES } from '@/data/inventory';

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      <div className="glass-dark rounded-t-[2.5rem] px-6 py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Peep The Whip logo" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-display font-extrabold text-lg text-white">Peep The Whip</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your preferred BMW dealer in Kenya and East Africa. From Classics to New Age — we buy, sell, repair, and customize.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-display font-bold mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Cars for Sale' },
                { to: '/rigs', label: 'Offroad Rigs' },
                { to: '/parts', label: 'Parts Shop' },
                { to: '/build', label: 'Build & Customize' },
                { to: '/about', label: 'About Us' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 hover:text-bmw-300 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-bmw-300 shrink-0" />
                Bunyala Rd, Nairobi, Kenya
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bmw-300 shrink-0" />
                0722 507773
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bmw-300 shrink-0" />
                info@peepthewhip.co.ke
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-bmw-300 shrink-0" />
                Mon–Sat: 9am – 6pm<br />Sunday: Closed
              </li>
            </ul>
          </div>

          {/* Rating badge */}
          <div>
            <h4 className="text-white font-display font-bold mb-4 text-sm uppercase tracking-wider">Rated</h4>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-display font-extrabold text-white">4.4</span>
                <div className="flex">
                  {[1,2,3,4].map(i => <span key={i} className="text-amber-400 text-sm">★</span>)}
                  <span className="text-amber-400/40 text-sm">★</span>
                </div>
              </div>
              <p className="text-white/60 text-xs">4,418 Google reviews</p>
              <p className="text-white/50 text-xs mt-1">Used car dealer in Nairobi</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/50 text-xs">© {new Date().getFullYear()} Peep The Whip Cars. All rights reserved.</p>
          <p className="text-white/50 text-xs">All prices in {formatKES(0).split(' ')[0]} (Kenyan Shillings)</p>
        </div>
      </div>
    </footer>
  );
}
