import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, FileText, Users, TrendingUp, ArrowRight } from 'lucide-react';

const resources = [
  { icon: FileText, title: 'Resume Writing', desc: 'Step-by-step guides on writing each section of your resume — from summary to skills.', link: '/blog' },
  { icon: TrendingUp, title: 'ATS Optimization', desc: 'Learn how ATS works and how to format your resume to pass automated screening.', link: '/blog' },
  { icon: Briefcase, title: 'Job Search Strategy', desc: 'Structured plans and frameworks to organize and accelerate your job search.', link: '/blog' },
  { icon: Users, title: 'Networking', desc: 'Build genuine professional relationships that lead to opportunities.', link: '/blog' },
  { icon: BookOpen, title: 'Interview Prep', desc: 'Common questions, behavioral frameworks, and tips to ace your interviews.', link: '/interview-tips' },
  { icon: ArrowRight, title: 'Career Growth', desc: 'Advice on promotions, career transitions, and long-term professional development.', link: '/blog' },
];

export default function CareerResourcesPage() {
  return (
    <div className="container-page pt-28 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">Career Resources</h1>
        <p className="mt-4 text-lg text-ink-600">
          Career advice, common interview questions, and proven tips to help you leverage your resume and land the job.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((r) => (
          <Link key={r.title} to={r.link} className="card p-6 hover:shadow-card hover:-translate-y-0.5 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <r.icon className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-bold text-ink-900 mb-2 group-hover:text-brand-600 transition-colors">{r.title}</h3>
            <p className="text-sm text-ink-600 leading-relaxed">{r.desc}</p>
            <span className="text-xs text-brand-600 mt-3 flex items-center gap-1">Explore <ArrowRight className="w-3 h-3" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
