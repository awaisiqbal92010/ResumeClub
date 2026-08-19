import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="container-page pt-28 pb-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">Create your account</h1>
          <p className="text-ink-500 mt-2">Sign up to get started</p>
        </div>

        <div className="card p-8 space-y-5">
          <div>
            <label className="label-field">Full Name</label>
            <input className="input-field" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="label-field">Email Address</label>
            <input type="email" className="input-field" placeholder="you@email.com" />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <div>
            <label className="label-field">Confirm Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <label className="flex items-start gap-2 text-sm text-ink-600">
            <input type="checkbox" className="rounded mt-1" />
            <span>I agree to the <Link to="/terms" className="text-brand-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link></span>
          </label>
          <Link to="/builder" className="btn-primary w-full">
            Create account <ArrowRight className="w-4 h-4" />
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
          Already have an account? <Link to="/login" className="text-brand-600 hover:underline font-semibold">Log in</Link>
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 text-xs text-ink-400">
          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Free plan available</span>
          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> No credit card required</span>
        </div>
      </div>
    </div>
  );
}
