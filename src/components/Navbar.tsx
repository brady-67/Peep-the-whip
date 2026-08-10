import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Car as CarIcon, Truck, Wrench, Hammer, Info } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Cars', icon: CarIcon },
  { to: '/rigs', label: 'Rigs', icon: Truck },
  { to: '/parts', label: 'Parts Shop', icon: Wrench },
  { to: '/build', label: 'Build & Customize', icon: Hammer },
  { to: '/about', label: 'About', icon: Info },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-2' : 'py-4 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bmw-500 to-bmw-700 flex items-center justify-center shadow-lg shadow-bmw-500/30 transition-transform group-hover:scale-110">
              <span className="text-white font-display font-extrabold text-lg">P</span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-bmw-400/50 animate-pulse-ring" />
          </div>
          <div className="leading-none">
            <span className="font-display font-extrabold text-lg text-bmw-700 tracking-tight">Peep The Whip</span>
            <span className="block text-[10px] text-bmw-500 font-medium tracking-widest uppercase">Cars · Nairobi</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  active
                    ? 'text-white bg-gradient-to-r from-bmw-500 to-bmw-600 shadow-md shadow-bmw-500/30'
                    : 'text-ink/70 hover:text-bmw-700 hover:bg-white/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden p-2 rounded-lg glass-card"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-bmw-700" /> : <Menu className="w-5 h-5 text-bmw-700" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-4 glass-nav rounded-2xl p-4 animate-fade-up">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-3 transition-all ${
                    active
                      ? 'text-white bg-gradient-to-r from-bmw-500 to-bmw-600'
                      : 'text-ink/70 hover:bg-white/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
