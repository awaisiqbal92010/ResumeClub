import { useState } from 'react';
import { Mail, MessageSquare, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container-page pt-28 pb-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">Contact Us</h1>
          <p className="mt-4 text-lg text-ink-600">
            Have a question? We will get back to you shortly.
          </p>
        </div>

        {sent ? (
          <div className="card p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-ink-900">Thank you for reaching out</h3>
            <p className="text-ink-500 mt-2">Our team will respond to your email shortly.</p>
            <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="btn-secondary mt-6">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div>
              <label className="label-field">Your Name</label>
              <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
            </div>
            <div>
              <label className="label-field">Email Address</label>
              <input type="email" className="input-field" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@email.com" />
            </div>
            <div>
              <label className="label-field">Message</label>
              <textarea className="input-field min-h-[120px] resize-y" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" />
            </div>
            <button type="submit" className="btn-primary w-full">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="card p-5 text-center">
            <Mail className="w-6 h-6 text-brand-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-ink-900">Email Support</p>
            <p className="text-xs text-ink-500 mt-1">support@resumeforge.app</p>
          </div>
          <div className="card p-5 text-center">
            <MessageSquare className="w-6 h-6 text-accent-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-ink-900">Help Center</p>
            <p className="text-xs text-ink-500 mt-1">Browse FAQs & guides</p>
          </div>
        </div>
      </div>
    </div>
  );
}
