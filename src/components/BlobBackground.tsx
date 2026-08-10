interface BlobBackgroundProps {
  variant?: 'default' | 'offroad' | 'parts' | 'build';
}

export default function BlobBackground({ variant = 'default' }: BlobBackgroundProps) {
  const colors: Record<string, string[]> = {
    default: ['#66a3ff', '#0066b1', '#99c2ff'],
    offroad: ['#8B7355', '#6B5340', '#A89070'],
    parts: ['#3385ff', '#0066b1', '#66a3ff'],
    build: ['#ff6b35', '#0066b1', '#99c2ff'],
  };
  const [c1, c2, c3] = colors[variant];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="blob" style={{ background: c1, width: '500px', height: '500px', top: '-100px', left: '-100px', animationDelay: '0s' }} />
      <div className="blob" style={{ background: c2, width: '400px', height: '400px', top: '30%', right: '-100px', animationDelay: '5s' }} />
      <div className="blob" style={{ background: c3, width: '350px', height: '350px', bottom: '-50px', left: '30%', animationDelay: '10s' }} />
    </div>
  );
}
