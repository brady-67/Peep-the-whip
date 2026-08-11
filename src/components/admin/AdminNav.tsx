import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const sections = [
  { to: '/admin', label: 'Cars' },
  { to: '/admin/rigs', label: 'Rigs' },
  { to: '/admin/parts', label: 'Parts' },
  { to: '/admin/build', label: 'Build' },
];

export default function AdminNav() {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex gap-2 p-1.5 glass rounded-full">
        {sections.map((s) => {
          const active = location.pathname === s.to;
          return (
            <Link
              key={s.to}
              to={s.to}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active
                  ? 'bg-gradient-to-r from-bmw-500 to-bmw-600 text-white shadow-md shadow-bmw-500/30'
                  : 'text-ink/60 hover:text-bmw-700'
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </div>
      <button onClick={logout} className="btn-ghost flex items-center gap-2 text-sm">
        <LogOut className="w-4 h-4" />
        Log out
      </button>
    </div>
  );
}
