import { Link } from 'react-router-dom';
import { FileText, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="container-page pt-28 pb-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">Welcome back</h1>
          <p className="text-ink-500 mt-2">Log in to your account</p>
        </div>

        <div className="card p-8 space-y-5">
          <div>
            <label className="label-field">Email Address</label>
            <input type="email" className="input-field" placeholder="you@email.com" />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-ink-600">
              <input type="checkbox" className="rounded" /> Remember me
            </label>
            <a href="#" className="text-brand-600 hover:underline">Forgot password?</a>
          </div>
          <Link to="/dashboard" className="btn-primary w-full">
            Log in <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ink-200" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-ink-400">or</span></div>
          </div>

          <button className="btn-secondary w-full">
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-ink-500 mt-6">
          Do not have an account? <Link to="/register" className="text-brand-600 hover:underline font-semibold">Create one</Link>
        </p>
      </div>
    </div>
  );
}
