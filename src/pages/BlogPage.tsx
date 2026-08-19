import { useMemo, useState } from 'react';
import { Calendar, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { blogArticles } from '@/data/blogs';

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All topics');
  const categories = ['All topics', ...Array.from(new Set(blogArticles.map((article) => article.category)))];
  const filtered = useMemo(() => blogArticles.filter((article) => {
    const searchable = `${article.title} ${article.excerpt} ${article.keywords.join(' ')}`.toLowerCase();
    return (category === 'All topics' || article.category === category) && searchable.includes(query.toLowerCase());
  }), [category, query]);

  return (
    <div className="container-page pt-28 pb-16">
      <SEO
        title="Career Blog: Resume, CV, and Job Search Advice"
        description="Explore practical resume, CV, ATS, interview, and career advice for technology, engineering, healthcare, business, and creative professionals."
        path="/blog"
        keywords={['resume advice', 'CV writing tips', 'ATS optimization', 'career blog', 'job search advice']}
        structuredData={{ '@context': 'https://schema.org', '@type': 'Blog', name: 'Resume.Club Career Blog', description: 'Resume and career advice for modern job seekers.', url: 'https://resume.club/blog' }}
      />
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="section-eyebrow mb-4">Career knowledge hub</div>
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">Resume tips for the job you want next</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-600">Field-specific guidance on CV writing, ATS optimization, career changes, and measurable professional storytelling.</p>
      </div>
      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-ink-200 bg-white p-4 md:flex-row">
        <label className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-ink-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resume and career advice" className="input-field pl-9" aria-label="Search articles" /></label>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="input-field md:w-56" aria-label="Filter articles by topic">{categories.map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      <p className="mb-5 text-sm font-medium text-ink-500">Showing {filtered.length} of {blogArticles.length} articles</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <Link key={article.slug} to={`/blog/${article.slug}`} className="card group p-6 transition-all hover:-translate-y-1 hover:shadow-card">
            <div className="mb-3 flex items-center gap-2"><span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">{article.category}</span><span className="text-xs text-ink-400">{article.readTime} read</span></div>
            <h2 className="mb-2 text-lg font-bold text-ink-900 transition-colors group-hover:text-brand-600">{article.title}</h2>
            <p className="line-clamp-3 text-sm leading-relaxed text-ink-600">{article.excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-ink-400"><span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span><span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span></div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <div className="py-16 text-center text-ink-500">No articles match that search. Try a broader role, skill, or topic.</div>}
    </div>
  );
}
