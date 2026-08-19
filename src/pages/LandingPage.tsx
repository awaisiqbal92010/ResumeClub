import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, FileText, Download, Eye, Zap, ShieldCheck, Palette,
  Star, ArrowRight, Check, Briefcase, GraduationCap, Award, Users,
  TrendingUp, Target, PenTool, Layout, BarChart3,
} from 'lucide-react';
import ResumePreview from '@/components/ResumePreview';
import HeroSection from '@/components/HeroSection';
import Reveal from '@/components/Reveal';
import { sampleResumeData, templateOptions } from '@/types/resume';

export default function LandingPage() {
  const [activeTemplate, setActiveTemplate] = useState(0);

  return (
    <div>
      <HeroSection />

      {/* STATS BAR */}
      <section className="border-y border-ink-200/60 bg-white">
        <div className="container-page py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Job Seekers', icon: Users },
              { value: '125K+', label: 'Resumes Created', icon: FileText },
              { value: '4.9/5', label: 'User Rating', icon: Star },
              { value: '3x', label: 'More Interviews', icon: TrendingUp },
            ].map((stat, i) => (
              <Reveal key={stat.label} variant="scale" delay={i * 100}>
                <div className="text-center">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-brand-50 items-center justify-center mb-3 hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <p className="text-3xl font-extrabold text-ink-900">{stat.value}</p>
                  <p className="text-sm text-ink-500 mt-1">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20" id="features">
        <div className="container-page">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="section-eyebrow mb-4">
                <Zap className="w-3.5 h-3.5" /> Features
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-900 text-balance">
                Everything you need to get hired faster
              </h2>
              <p className="mt-4 text-lg text-ink-600 text-pretty">
                Smart AI that works like your personal career assistant — from writing to formatting to scoring.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: 'AI Resume Writer', desc: 'Generate a complete, professionally formatted resume from your structured data in one click.', color: 'brand' },
              { icon: Eye, title: 'Live inline Editing', desc: 'Every element in the preview is editable. Change text, formatting, add or remove entries — all live.', color: 'accent' },
              { icon: ShieldCheck, title: 'ATS Score Checker', desc: 'Get a real ATS score with actionable suggestions. Paste a job description for keyword matching.', color: 'emerald' },
              { icon: Palette, title: '6 Premium Templates', desc: 'Professionally designed, ATS-friendly, and fully customizable. Pick a style and start building.', color: 'amber' },
              { icon: Download, title: 'Print-Perfect PDF', desc: 'Download high-quality PDFs instantly. Every export is print-ready and ATS-parsable.', color: 'rose' },
              { icon: PenTool, title: 'AI Writing Assistant', desc: 'Rewrite bullet points, summarize experience, and polish your professional bio with AI.', color: 'brand' },
              { icon: Briefcase, title: 'Cover Letter Builder', desc: 'Generate a perfectly matched cover letter using your existing resume data.', color: 'accent' },
              { icon: Target, title: 'AI Job Matcher', desc: 'Paste a job description and let AI tailor your resume to mirror its keywords.', color: 'emerald' },
              { icon: BarChart3, title: 'Portfolio Analytics', desc: 'Publish your resume as a portfolio site and track views, match scores, and more.', color: 'amber' },
            ].map((f, i) => (
              <Reveal key={f.title} variant="up" delay={i * 80}>
                <div className="card-3d p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300 group perspective-1000">
                  <div className={`w-12 h-12 rounded-xl bg-${f.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    <f.icon className={`w-6 h-6 text-${f.color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2 group-hover:text-brand-600 transition-colors">{f.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-ink-900 text-white relative overflow-hidden" id="how">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="container-page relative">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Zap className="w-3.5 h-3.5" /> How It Works
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
                Build your resume in 3 simple steps
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: FileText, title: 'Fill in Your Details', desc: 'Enter your personal info, experience, education, and skills in a simple form.' },
              { step: '2', icon: Sparkles, title: 'AI Processing', desc: 'Let AI polish your content — rewrite bullets, optimize for ATS, and format perfectly.' },
              { step: '3', icon: Download, title: 'Download & Apply', desc: 'Export a print-perfect PDF and start applying to jobs with confidence.' },
            ].map((s, i) => (
              <Reveal key={s.step} variant="rotate" delay={i * 150}>
                <div className="relative group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <s.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-5xl font-extrabold text-white/10 group-hover:text-white/20 transition-colors">{s.step}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-ink-400 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" delay={200}>
            <div className="text-center mt-12">
              <Link to="/builder" className="btn-accent text-base px-6 py-3 group">
                Start Building Your Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEMPLATES SHOWCASE */}
      <section className="py-20" id="templates">
        <div className="container-page">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="section-eyebrow mb-4">
                <Layout className="w-3.5 h-3.5" /> Templates
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-900 text-balance">
                Choose from 6 premium resume templates
              </h2>
              <p className="mt-4 text-lg text-ink-600 text-pretty">
                Professionally designed, ATS-friendly, and fully customizable. Pick a style that fits your industry.
              </p>
            </div>
          </Reveal>

          {/* Template switcher - pill style */}
          <Reveal variant="up" delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {templateOptions.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplate(i)}
                  className={`btn-pill ${
                    activeTemplate === i
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                      : 'bg-white text-ink-600 border border-ink-200 hover:border-brand-300 hover:text-brand-700'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <Reveal variant="left" className="lg:col-span-2">
              <div className="shadow-float rounded-2xl overflow-hidden border border-ink-200/50 max-w-2xl mx-auto">
                <div className="max-h-[600px] overflow-y-auto no-scrollbar">
                  <ResumePreview
                    data={sampleResumeData}
                    template={templateOptions[activeTemplate].id}
                    accentColor={templateOptions[activeTemplate].accent}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={150}>
              <div className="space-y-4">
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-ink-900">{templateOptions[activeTemplate].name}</h3>
                  <p className="text-sm text-ink-600 mt-1">{templateOptions[activeTemplate].description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs font-semibold text-ink-500">Category:</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">
                      {templateOptions[activeTemplate].category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-semibold text-ink-500">Accent:</span>
                    <div className="w-5 h-5 rounded-full border border-ink-200" style={{ backgroundColor: templateOptions[activeTemplate].accent }} />
                  </div>
                  <Link to="/builder" className="btn-primary w-full mt-5 group">
                    Use This Template
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <Link to="/templates" className="btn-secondary w-full">
                  View All Templates
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-ink-50">
        <div className="container-page">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="section-eyebrow mb-4">
                <Star className="w-3.5 h-3.5" /> Testimonials
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-900 text-balance">
                Loved by job seekers worldwide
              </h2>
              <p className="mt-4 text-lg text-ink-600">
                Join 50,000+ job seekers who landed their dream roles with Resume.Club.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Emily Rodriguez', role: 'Software Engineer at Google', text: 'Resume.Club helped me land 3 interviews in a week. The AI-generated resume was polished and ATS-friendly from the start.', avatar: 'ER', color: 'brand' },
              { name: 'Marcus Johnson', role: 'Product Manager at Stripe', text: 'The ATS scoring feature is a game-changer. I went from 60 to 95 match score just by following the suggestions.', avatar: 'MJ', color: 'accent' },
              { name: 'Lisa Anderson', role: 'UX Designer at Airbnb', text: 'The inline editor is incredible — I can tweak any detail right in the preview. No more back-and-forth between forms.', avatar: 'LA', color: 'emerald' },
              { name: 'Tom Williams', role: 'Marketing Lead at HubSpot', text: 'From filling the form to downloading a PDF took me 5 minutes. The AI did all the heavy lifting.', avatar: 'TW', color: 'amber' },
              { name: 'Priya Patel', role: 'Data Scientist at Meta', text: 'Best resume builder I have used. The AI suggestions actually improved my bullet points meaningfully.', avatar: 'PP', color: 'rose' },
              { name: 'David Kim', role: 'DevOps Eng at AWS', text: 'The technical template is perfect for engineers. Skills chips, clean layout, and ATS-friendly. Love it.', avatar: 'DK', color: 'brand' },
            ].map((t, i) => (
              <Reveal key={t.name} variant="up" delay={i * 80}>
                <div className="card p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-${t.color}-100 flex items-center justify-center text-${t.color}-700 font-bold text-sm group-hover:scale-110 transition-transform`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink-900">{t.name}</p>
                      <p className="text-xs text-ink-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-20" id="pricing">
        <div className="container-page">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="section-eyebrow mb-4">
                <Award className="w-3.5 h-3.5" /> Pricing
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-900 text-balance">
                Simple, transparent, affordable pricing
              </h2>
              <p className="mt-4 text-lg text-ink-600">
                Start free. Upgrade to Pro when you are ready to unlock everything.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Reveal variant="left">
              <div className="card p-8 hover:shadow-card transition-shadow">
                <h3 className="text-xl font-bold text-ink-900">Free Plan</h3>
                <p className="text-sm text-ink-500 mt-1">Everything you need to get started</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-ink-900">$0</span>
                  <span className="text-ink-500">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {['1 resume template', '1 ATS score check', 'Basic PDF export', 'AI resume generation', 'Auto-save'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/builder" className="btn-secondary w-full mt-8">Get Started Free</Link>
              </div>
            </Reveal>

            <Reveal variant="right" delay={100}>
              <div className="card p-8 ring-2 ring-brand-500 relative hover:shadow-float transition-shadow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-ink-900">Pro Plan</h3>
                <p className="text-sm text-ink-500 mt-1">Unlock the full power of Resume.Club</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-ink-900">$12</span>
                  <span className="text-ink-500">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {['Unlimited resumes', 'All 6 premium templates', 'Unlimited ATS optimization', 'AI writing assistant', 'Cover letter builder', 'Portfolio builder', 'Priority support'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                      <Check className="w-4 h-4 text-brand-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="btn-primary w-full mt-8">Upgrade to Pro</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="container-page relative text-center">
          <Reveal variant="scale">
            <GraduationCap className="w-12 h-12 text-accent-400 mx-auto mb-6 animate-float" />
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto text-balance">
              Ready to land your dream job?
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-xl mx-auto">
              Create your first AI-powered resume in minutes. No credit card required.
            </p>
            <Link to="/builder" className="btn-accent text-base px-8 py-3.5 mt-8 group">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Get Started for Free
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
