import { useState, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { error } = login(password);
    if (error) {
      setError(error);
    } else {
      navigate('/admin');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="glass-card rounded-3xl p-8 w-full max-w-sm">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bmw-400 to-bmw-600 flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-display font-extrabold text-2xl text-ink mb-1">Admin Login</h1>
        <p className="text-sm text-ink/60 mb-6">Enter the admin password to manage listings.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-ink/60 block mb-1">Password</label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-bmw-100 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-bmw-400"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="btn-primary w-full justify-center">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
