import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container-page pt-28 pb-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-8xl font-extrabold gradient-text animate-gradient">404</h1>
        <h2 className="text-2xl font-bold text-ink-900 mt-4">Page Not Found</h2>
        <p className="text-ink-500 mt-2">The page you are looking for does not exist or has been moved.</p>
        <div className="flex gap-3 justify-center mt-8">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/builder" className="btn-secondary">
            <ArrowLeft className="w-4 h-4" /> Resume Builder
          </Link>
        </div>
      </div>
    </div>
  );
}
