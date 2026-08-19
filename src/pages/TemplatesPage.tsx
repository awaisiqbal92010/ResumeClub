import { useMemo, useState } from 'react';
import { ArrowRight, Check, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import ResumePreview from '@/components/ResumePreview';
import SEO from '@/components/SEO';
import { occupationTemplates, templateFields } from '@/data/templateLibrary';
import { builderFeatures } from '@/data/builderFeatures';
import { sampleResumeData } from '@/types/resume';

export default function TemplatesPage() {
  const [selectedId, setSelectedId] = useState(occupationTemplates[0].id);
  const [field, setField] = useState('All fields');
  const [query, setQuery] = useState('');
  const selected = occupationTemplates.find((template) => template.id === selectedId) ?? occupationTemplates[0];
  const filtered = useMemo(() => occupationTemplates.filter((template) => {
    const searchable = `${template.name} ${template.field} ${template.keywords.join(' ')}`.toLowerCase();
    return (field === 'All fields' || template.field === field) && searchable.includes(query.toLowerCase());
  }), [field, query]);

  return (
    <div className="container-page pt-28 pb-16">
      <SEO title="60+ CV Templates by Occupation and Industry" description="Choose an ATS-friendly CV template for technology, engineering, healthcare, finance, design, manufacturing, education, and more. Customize it in the Resume.Club builder." path="/templates" keywords={['CV templates by occupation', 'industry resume templates', 'ATS resume templates', 'engineering CV template', 'technology resume template']} structuredData={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Occupation CV Template Library', numberOfItems: occupationTemplates.length, url: 'https://resume.club/templates' }} />
      <div className="mx-auto mb-10 max-w-3xl text-center"><div className="section-eyebrow mb-4"><SlidersHorizontal className="h-3.5 w-3.5" /> Occupation library</div><h1 className="text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">A CV template for the work you do</h1><p className="mt-4 text-lg leading-relaxed text-ink-600">Browse {occupationTemplates.length} field-specific starting points. Every template stays editable, readable, and optimized for applicant tracking systems.</p></div>
      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-ink-200 bg-white p-4 md:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-ink-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search an occupation or skill" className="input-field pl-9" aria-label="Search templates" /></label><select value={field} onChange={(event) => setField(event.target.value)} className="input-field md:w-64" aria-label="Filter templates by field">{templateFields.map((item) => <option key={item}>{item}</option>)}</select></div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div><div className="mb-4 flex items-center justify-between"><p className="text-sm font-medium text-ink-500">{filtered.length} templates</p><p className="text-xs text-ink-400">Select a role to preview</p></div><div className="grid max-h-[720px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{filtered.map((template) => <button key={template.id} onClick={() => setSelectedId(template.id)} className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${selectedId === template.id ? 'border-brand-500 bg-brand-50 shadow-soft' : 'border-ink-200 bg-white hover:border-ink-300'}`}><div className="flex items-start justify-between gap-3"><div><h2 className="font-bold text-ink-900">{template.name}</h2><p className="mt-0.5 text-xs text-ink-500">{template.field}</p></div><span className="h-7 w-7 shrink-0 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: template.accent }} /></div><p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-600">{template.description}</p><div className="mt-3 flex items-center justify-between"><span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-ink-600">{template.baseTemplate} layout</span>{selectedId === template.id && <Check className="h-4 w-4 text-brand-600" />}</div></button>)}</div></div>
        <div><div className="sticky top-24"><div className="overflow-hidden rounded-2xl border border-ink-200/50 bg-white shadow-float"><div className="flex items-center justify-between border-b border-ink-200 bg-ink-100 px-4 py-3"><div><p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Live preview</p><h2 className="font-bold text-ink-900">{selected.name}</h2></div><span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-ink-600">{selected.field}</span></div><div className="max-h-[650px] overflow-y-auto no-scrollbar"><ResumePreview data={sampleResumeData} template={selected.baseTemplate} accentColor={selected.accent} /></div></div><div className="mt-6 flex flex-wrap justify-center gap-3"><Link to={`/builder?template=${selected.baseTemplate}&occupation=${selected.id}`} className="btn-primary">Use This Template <ArrowRight className="h-4 w-4" /></Link><Link to="/blog" className="btn-secondary">Read career advice</Link></div></div></div>
      </div>
      {filtered.length === 0 && <div className="py-16 text-center text-ink-500">No templates match that search. Try a broader field or occupation.</div>}
      <section className="mt-20 border-t border-ink-200 pt-12" aria-labelledby="builder-toolkit-title">
        <div className="mx-auto mb-8 max-w-2xl text-center"><div className="section-eyebrow mb-3">Built for better applications</div><h2 id="builder-toolkit-title" className="text-3xl font-extrabold text-ink-900">A complete toolkit for your next application</h2><p className="mt-3 text-ink-600">From the first template choice to the final polished document, Resume.Club keeps the important details in one place.</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{builderFeatures.map(([name, description]) => <div key={name} className="rounded-xl border border-ink-200 bg-white p-4"><h3 className="text-sm font-bold text-ink-900">{name}</h3><p className="mt-1 text-xs leading-relaxed text-ink-500">{description}</p></div>)}</div>
      </section>
    </div>
  );
}
