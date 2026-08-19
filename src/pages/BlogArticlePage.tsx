import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import { blogArticles, blogBySlug } from '@/data/blogs';

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = slug ? blogBySlug[slug] : undefined;

  if (!article) return <div className="container-page pt-28 pb-16 text-center"><h1 className="text-3xl font-bold text-ink-900">Article not found</h1><Link to="/blog" className="btn-primary mt-6">Back to the career blog</Link></div>;

  const related = blogArticles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 3);
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.excerpt, author: { '@type': 'Organization', name: article.author }, datePublished: article.date, keywords: article.keywords.join(', '), mainEntityOfPage: `https://resume.club/blog/${article.slug}` };

  return (
    <div className="container-page pt-28 pb-16">
      <SEO title={article.title} description={article.excerpt} path={`/blog/${article.slug}`} keywords={article.keywords} type="article" structuredData={articleSchema} />
      <article className="mx-auto max-w-3xl">
        <Link to="/blog" className="btn-ghost mb-7 text-sm"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{article.category}</span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">{article.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-600">{article.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-400"><span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {article.author}</span><span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {article.date}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span></div>
        <div className="mt-10 space-y-5">{article.body.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-ink-700">{paragraph}</p>)}</div>
        <div className="mt-8 flex flex-wrap gap-2">{article.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-600">{keyword}</span>)}</div>
        <div className="mt-12 border-t border-ink-200 pt-8"><h2 className="mb-4 text-xl font-bold text-ink-900">More {article.category} guidance</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((item) => <Link key={item.slug} to={`/blog/${item.slug}`} className="card group p-4"><h3 className="text-sm font-bold text-ink-900 group-hover:text-brand-600">{item.title}</h3><span className="mt-3 flex items-center gap-1 text-xs text-brand-600">Read article <ArrowRight className="h-3 w-3" /></span></Link>)}</div></div>
      </article>
    </div>
  );
}
