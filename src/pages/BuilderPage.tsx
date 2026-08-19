import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Sparkles, Download, Plus, Trash2,
  User, Briefcase, GraduationCap, Award, Wrench, FolderGit2,
  ChevronDown, ChevronRight, WandSparkles, Loader, Check, Palette,
  ShieldCheck, PenTool, X, Upload, Image as ImageIcon,
} from 'lucide-react';
import ResumePreview from '@/components/ResumePreview';
import ATSChecker from '@/components/ATSChecker';
import { supabase } from '@/lib/supabase';
import { genId } from '@/lib/utils';
import {
  type Resume, type ResumeData, type WorkExperience, type Education,
  type Skill, type Project, type Certification,
  emptyResumeData, sampleResumeData, templateOptions,
} from '@/types/resume';
import { occupationTemplates } from '@/data/templateLibrary';

type SectionKey = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';
type PanelTab = 'editor' | 'ats' | 'ai';

export default function BuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const previewRef = useRef<HTMLDivElement>(null);

  const [resumeId, setResumeId] = useState<string | null>(id || null);
  const [title, setTitle] = useState('Untitled Resume');
  const [template, setTemplate] = useState(searchParams.get('template') || 'modern');
  const [occupationId, setOccupationId] = useState(searchParams.get('occupation') || '');
  const [accentColor, setAccentColor] = useState(searchParams.get('occupation') ? (occupationTemplates.find((item) => item.id === searchParams.get('occupation'))?.accent || '#4F46E5') : '#4F46E5');
  const [data, setData] = useState<ResumeData>(emptyResumeData);
  const [activeSection, setActiveSection] = useState<SectionKey>('personal');
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [panelTab, setPanelTab] = useState<PanelTab>('editor');
  const [improvingBullet, setImprovingBullet] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const { data: row, error } = await supabase.from('resumes').select('*').eq('id', id).maybeSingle();
      if (error || !row) {
        setLoading(false);
        return;
      }
      setResumeId(row.id);
      setTitle(row.title);
      setTemplate(row.template);
      setAccentColor(row.accent_color);
      setData(row.data as ResumeData);
      setLoading(false);
    })();
  }, [id]);

  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doSave = useCallback(async () => {
    setSaving(true);
    const payload = {
      title,
      template,
      accent_color: accentColor,
      data,
      updated_at: new Date().toISOString(),
    };
    if (resumeId) {
      const { error } = await supabase.from('resumes').update(payload).eq('id', resumeId);
      if (!error) setSavedAt(new Date());
    } else {
      const { data: row, error } = await supabase.from('resumes').insert(payload).select().single();
      if (!error && row) {
        setResumeId(row.id);
        setSavedAt(new Date());
        window.history.replaceState(null, '', `/builder/${row.id}`);
      }
    }
    setSaving(false);
  }, [resumeId, title, template, accentColor, data]);

  useEffect(() => {
    if (loading) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => doSave(), 1500);
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current); };
  }, [title, template, accentColor, data, loading, doSave]);

  const handleDownloadPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 200);
  };

  const handleGenerateAI = () => {
    setGenerating(true);
    setTimeout(() => {
      setData(sampleResumeData);
      setGenerating(false);
    }, 1500);
  };

  const improveBullet = (expId: string, bulletIdx: number, currentText: string) => {
    setImprovingBullet(`${expId}-${bulletIdx}`);
    const improvements: Record<string, string> = {
      default: `${currentText.charAt(0).toUpperCase() + currentText.slice(1)}, resulting in a 40% improvement in team productivity and a measurable impact on overall delivery timelines.`,
    };
    setTimeout(() => {
      setData((d) => ({
        ...d,
        experience: d.experience.map((e) => {
          if (e.id !== expId) return e;
          const newBullets = [...e.bulletPoints];
          newBullets[bulletIdx] = improvements.default;
          return { ...e, bulletPoints: newBullets };
        }),
      }));
      setImprovingBullet(null);
    }, 1200);
  };

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData((d) => ({ ...d, personalInfo: { ...d.personalInfo, [field]: value } }));
  };

  const sections: { key: SectionKey; label: string; icon: typeof User }[] = [
    { key: 'personal', label: 'Personal', icon: User },
    { key: 'summary', label: 'Summary', icon: Sparkles },
    { key: 'experience', label: 'Experience', icon: Briefcase },
    { key: 'education', label: 'Education', icon: GraduationCap },
    { key: 'skills', label: 'Skills', icon: Wrench },
    { key: 'projects', label: 'Projects', icon: FolderGit2 },
    { key: 'certifications', label: 'Certs', icon: Award },
  ];

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-[60vh]">
        <Loader className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-ink-100">
      {/* Top bar */}
      <div className="no-print sticky top-16 z-30 glass border-b border-ink-200/60 px-4 py-3 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm font-semibold text-ink-900 bg-transparent border-none focus:outline-none focus:ring-0 w-40 sm:w-60 px-2 py-1 rounded-full hover:bg-ink-50 focus:bg-ink-50 transition-colors"
            placeholder="Untitled Resume"
          />
          <div className="flex items-center gap-1.5 text-xs text-ink-400 shrink-0">
            {saving ? (
              <><Loader className="w-3 h-3 animate-spin" /> Saving...</>
            ) : savedAt ? (
              <><Check className="w-3 h-3 text-emerald-500" /> Auto-saved</>
            ) : (
              <>Auto-save on</>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleGenerateAI} className="btn-ghost text-xs hidden sm:flex" disabled={generating}>
            {generating ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <WandSparkles className="w-3.5 h-3.5" />}
            AI Generate
          </button>
          <button onClick={handleDownloadPDF} className="btn-primary text-xs" disabled={downloading}>
            {downloading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            Download PDF
          </button>
        </div>
      </div>

      <div className="no-print flex flex-col lg:flex-row">
        {/* Left: Section nav + forms + ATS panel */}
        <div className="lg:w-[420px] xl:w-[480px] shrink-0 bg-white border-r border-ink-200 min-h-[calc(100vh-7rem)] flex flex-col">
          {/* Panel tabs - pill style */}
          <div className="flex gap-1 p-3 border-b border-ink-200 sticky top-0 bg-white z-10">
            <div className="flex gap-1 p-1 rounded-full bg-ink-100/60 w-full">
              {([
                { key: 'editor' as const, label: 'Editor', icon: PenTool },
                { key: 'ats' as const, label: 'ATS Score', icon: ShieldCheck },
                { key: 'ai' as const, label: 'AI Writer', icon: Sparkles },
              ]).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setPanelTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    panelTab === tab.key
                      ? 'bg-white text-brand-700 shadow-sm'
                      : 'text-ink-500 hover:text-ink-700'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Editor panel */}
          {panelTab === 'editor' && (
            <>
              {/* Section tabs */}
              <div className="flex flex-wrap gap-1 p-3 border-b border-ink-200 sticky top-[57px] bg-white z-10">
                {sections.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setActiveSection(s.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                      activeSection === s.key
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-ink-100/60 text-ink-600 hover:bg-ink-100 hover:text-ink-800'
                    }`}
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Forms */}
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                {activeSection === 'personal' && <PersonalForm data={data} update={updatePersonalInfo} />}
                {activeSection === 'summary' && <SummaryForm data={data} setData={setData} />}
                {activeSection === 'experience' && (
                  <ExperienceForm
                    data={data}
                    setData={setData}
                    expanded={expandedExp}
                    setExpanded={setExpandedExp}
                    improveBullet={improveBullet}
                    improvingBullet={improvingBullet}
                  />
                )}
                {activeSection === 'education' && <EducationForm data={data} setData={setData} />}
                {activeSection === 'skills' && <SkillsForm data={data} setData={setData} />}
                {activeSection === 'projects' && <ProjectsForm data={data} setData={setData} />}
                {activeSection === 'certifications' && <CertificationsForm data={data} setData={setData} />}
              </div>

              {/* Template + color */}
              <div className="p-4 border-t border-ink-200 space-y-3">
                <div>
                  <label className="label-field">Occupation template library</label>
                  <select value={occupationId} onChange={(event) => { const selected = occupationTemplates.find((item) => item.id === event.target.value); setOccupationId(event.target.value); if (selected) { setTemplate(selected.baseTemplate); setAccentColor(selected.accent); } }} className="input-field text-xs">
                    <option value="">Choose an occupation template...</option>
                    {occupationTemplates.map((item) => <option key={item.id} value={item.id}>{item.name} — {item.field}</option>)}
                  </select>
                  {occupationId && <p className="mt-1 text-[11px] text-ink-400">ATS-friendly {occupationTemplates.find((item) => item.id === occupationId)?.baseTemplate} layout with role-specific keywords.</p>}
                </div>
                <div>
                  <label className="label-field">Layout style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {templateOptions.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        className={`px-2 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
                          template === t.id
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-ink-200 text-ink-600 hover:border-ink-300'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label-field flex items-center gap-1.5"><Palette className="w-3.5 h-3.5" /> Accent Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {['#4F46E5', '#06B6D4', '#0F172A', '#059669', '#EC4899', '#F59E0B', '#E11D48', '#7C3AED'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setAccentColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                          accentColor === c ? 'border-ink-900 scale-110' : 'border-ink-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c }}
                        aria-label={`Accent color ${c}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ATS panel */}
          {panelTab === 'ats' && (
            <div className="p-4 flex-1 overflow-y-auto">
              <ATSChecker data={data} />
            </div>
          )}

          {/* AI Writer panel */}
          {panelTab === 'ai' && (
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <WandSparkles className="w-5 h-5 text-brand-600" />
                  <h3 className="font-bold text-ink-900">AI Writing Assistant</h3>
                </div>
                <p className="text-sm text-ink-600 mb-4">
                  Use AI to improve your resume content. Click any action below to enhance your resume.
                </p>
                <div className="space-y-2">
                  <button onClick={handleGenerateAI} className="btn-primary w-full text-sm" disabled={generating}>
                    {generating ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Generate Full Resume
                  </button>
                  <button
                    onClick={() => setData((d) => ({ ...d, summary: 'Senior Software Engineer with 8+ years building scalable web applications. Specialized in React, TypeScript, and cloud architecture. Led teams of 5+ engineers and shipped products used by millions.' }))}
                    className="btn-secondary w-full text-sm"
                  >
                    <PenTool className="w-4 h-4" /> Rewrite Summary
                  </button>
                  <button
                    onClick={() => setData((d) => ({
                      ...d,
                      skills: d.skills.length === 0
                        ? [
                          { id: genId(), name: 'TypeScript', level: 'Expert' },
                          { id: genId(), name: 'React', level: 'Expert' },
                          { id: genId(), name: 'Node.js', level: 'Advanced' },
                          { id: genId(), name: 'Python', level: 'Advanced' },
                          { id: genId(), name: 'AWS', level: 'Intermediate' },
                          { id: genId(), name: 'PostgreSQL', level: 'Advanced' },
                          { id: genId(), name: 'GraphQL', level: 'Intermediate' },
                          { id: genId(), name: 'Docker', level: 'Advanced' },
                        ]
                        : d.skills,
                    }))}
                    className="btn-secondary w-full text-sm"
                  >
                    <Wrench className="w-4 h-4" /> Suggest Skills
                  </button>
                </div>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-accent-500" />
                  <h3 className="font-bold text-ink-900">AI Tips</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Start bullet points with action verbs like "Led", "Built", "Architected".',
                    'Quantify your impact: use numbers, percentages, and dollar amounts.',
                    'Keep your summary to 2-3 sentences highlighting your top strengths.',
                    'Mirror keywords from the job description in your skills and experience.',
                    'Avoid filler phrases like "responsible for" — use direct action verbs instead.',
                  ].map((tip, i) => (
                    <li key={i} className="text-xs text-ink-600 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-400">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div className="flex-1 p-4 lg:p-8 bg-ink-100">
          <div className="max-w-[800px] mx-auto">
            <div className="shadow-float rounded-2xl overflow-hidden border border-ink-200/50 bg-white print-area">
              <ResumePreview ref={previewRef} data={data} template={template} accentColor={accentColor} />
            </div>
            <p className="text-center text-xs text-ink-400 mt-4 no-print">
              Your resume preview updates live as you type. Click Download PDF to export.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ FORM COMPONENTS ============ */

function PersonalForm({ data, update }: { data: ResumeData; update: (field: keyof ResumeData['personalInfo'], value: string) => void }) {
  const p = data.personalInfo;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-field">Full Name</label>
          <input className="input-field" value={p.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Alex Morgan" />
        </div>
        <div>
          <label className="label-field">Professional Title</label>
          <input className="input-field" value={p.professionalTitle} onChange={(e) => update('professionalTitle', e.target.value)} placeholder="Software Engineer" />
        </div>
      </div>
      <div>
        <label className="label-field">Email</label>
        <input className="input-field" value={p.email} onChange={(e) => update('email', e.target.value)} placeholder="alex@email.com" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-field">Phone</label>
          <input className="input-field" value={p.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" />
        </div>
        <div>
          <label className="label-field">Location</label>
          <input className="input-field" value={p.location} onChange={(e) => update('location', e.target.value)} placeholder="San Francisco, CA" />
        </div>
      </div>
      <div>
        <label className="label-field">Website</label>
        <input className="input-field" value={p.website} onChange={(e) => update('website', e.target.value)} placeholder="alexmorgan.dev" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-field">LinkedIn</label>
          <input className="input-field" value={p.linkedin} onChange={(e) => update('linkedin', e.target.value)} placeholder="linkedin.com/in/..." />
        </div>
        <div>
          <label className="label-field">GitHub</label>
          <input className="input-field" value={p.github} onChange={(e) => update('github', e.target.value)} placeholder="github.com/..." />
        </div>
      </div>
      <div>
        <label className="label-field">Profile Photo</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-2 border-ink-200 overflow-hidden bg-ink-50 flex items-center justify-center shrink-0">
            {p.photo ? (
              <img src={p.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-8 h-8 text-ink-300" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <label className="btn-secondary cursor-pointer text-sm inline-flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => update('photo', reader.result as string);
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            {p.photo && (
              <button onClick={() => update('photo', '')} className="btn-ghost text-xs text-rose-500 inline-flex items-center gap-1">
                <X className="w-3 h-3" /> Remove Photo
              </button>
            )}
            <p className="text-xs text-ink-400">Optional — appears in the header of your resume.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryForm({ data, setData }: { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>> }) {
  const wordCount = data.summary ? data.summary.trim().split(/\s+/).length : 0;
  return (
    <div className="space-y-3">
      <label className="label-field">Professional Summary</label>
      <textarea
        className="input-field min-h-[120px] resize-y"
        value={data.summary}
        onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
        placeholder="A brief 2-3 sentence summary of your professional background and strengths..."
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-ink-400">Tip: Use active voice and highlight your key strengths. Keep it to 2-3 sentences.</p>
        <span className={`text-xs font-semibold ${wordCount >= 20 && wordCount <= 60 ? 'text-emerald-600' : 'text-amber-500'}`}>
          {wordCount} words
        </span>
      </div>
    </div>
  );
}

function ExperienceForm({ data, setData, expanded, setExpanded, improveBullet, improvingBullet }: {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  expanded: string | null;
  setExpanded: React.Dispatch<React.SetStateAction<string | null>>;
  improveBullet: (expId: string, bulletIdx: number, currentText: string) => void;
  improvingBullet: string | null;
}) {
  const addExp = () => {
    const newExp: WorkExperience = { id: genId(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, bulletPoints: [''] };
    setData((d) => ({ ...d, experience: [...d.experience, newExp] }));
    setExpanded(newExp.id);
  };
  const removeExp = (id: string) => setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== id) }));
  const updateExp = (id: string, field: keyof WorkExperience, value: string | boolean | string[]) => {
    setData((d) => ({ ...d, experience: d.experience.map((e) => e.id === id ? { ...e, [field]: value } : e) }));
  };

  return (
    <div className="space-y-3">
      {data.experience.map((exp) => (
        <div key={exp.id} className="border border-ink-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-ink-50">
            <button onClick={() => setExpanded(expanded === exp.id ? null : exp.id)} className="flex items-center gap-2 text-sm font-semibold text-ink-800 flex-1 text-left">
              {expanded === exp.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {exp.jobTitle || 'New Position'} {exp.company && `at ${exp.company}`}
            </button>
            <button onClick={() => removeExp(exp.id)} className="text-ink-400 hover:text-rose-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {expanded === exp.id && (
            <div className="p-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-field">Job Title</label>
                  <input className="input-field" value={exp.jobTitle} onChange={(e) => updateExp(exp.id, 'jobTitle', e.target.value)} placeholder="Senior Engineer" />
                </div>
                <div>
                  <label className="label-field">Company</label>
                  <input className="input-field" value={exp.company} onChange={(e) => updateExp(exp.id, 'company', e.target.value)} placeholder="Google" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-field">Start Date</label>
                  <input type="month" className="input-field" value={exp.startDate} onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)} />
                </div>
                <div>
                  <label className="label-field">End Date</label>
                  <input type="month" className="input-field" value={exp.endDate} disabled={exp.current} onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id={`current-${exp.id}`} checked={exp.current} onChange={(e) => updateExp(exp.id, 'current', e.target.checked)} className="rounded" />
                <label htmlFor={`current-${exp.id}`} className="text-sm text-ink-600">I currently work here</label>
              </div>
              <div>
                <label className="label-field">Location</label>
                <input className="input-field" value={exp.location} onChange={(e) => updateExp(exp.id, 'location', e.target.value)} placeholder="Mountain View, CA" />
              </div>
              <div>
                <label className="label-field">Bullet Points</label>
                <div className="space-y-2">
                  {exp.bulletPoints.map((b, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex gap-2">
                        <textarea
                          className="input-field min-h-[60px] resize-y"
                          value={b}
                          onChange={(e) => {
                            const newBullets = [...exp.bulletPoints];
                            newBullets[i] = e.target.value;
                            updateExp(exp.id, 'bulletPoints', newBullets);
                          }}
                          placeholder="Architected a system serving 2M daily users..."
                        />
                        <button onClick={() => {
                          const newBullets = exp.bulletPoints.filter((_, idx) => idx !== i);
                          updateExp(exp.id, 'bulletPoints', newBullets);
                        }} className="text-ink-400 hover:text-rose-500 transition-colors shrink-0 mt-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {b.trim() && (
                        <button
                          onClick={() => improveBullet(exp.id, i, b)}
                          disabled={improvingBullet === `${exp.id}-${i}`}
                          className="btn-pill bg-brand-50 text-brand-700 hover:bg-brand-100 text-xs"
                        >
                          {improvingBullet === `${exp.id}-${i}` ? (
                            <><Loader className="w-3 h-3 animate-spin" /> Improving...</>
                          ) : (
                            <><Sparkles className="w-3 h-3" /> Improve with AI</>
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => updateExp(exp.id, 'bulletPoints', [...exp.bulletPoints, ''])} className="btn-ghost text-xs">
                    <Plus className="w-3 h-3" /> Add Bullet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addExp} className="btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Experience
      </button>
    </div>
  );
}

function EducationForm({ data, setData }: { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>> }) {
  const addEdu = () => {
    const newEdu: Education = { id: genId(), degree: '', school: '', location: '', startDate: '', endDate: '', details: '' };
    setData((d) => ({ ...d, education: [...d.education, newEdu] }));
  };
  const removeEdu = (id: string) => setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }));
  const updateEdu = (id: string, field: keyof Education, value: string) => {
    setData((d) => ({ ...d, education: d.education.map((e) => e.id === id ? { ...e, [field]: value } : e) }));
  };

  return (
    <div className="space-y-3">
      {data.education.map((e) => (
        <div key={e.id} className="border border-ink-200 rounded-2xl p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-800">{e.degree || 'New Education'}</span>
            <button onClick={() => removeEdu(e.id)} className="text-ink-400 hover:text-rose-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-field">Degree</label>
              <input className="input-field" value={e.degree} onChange={(ev) => updateEdu(e.id, 'degree', ev.target.value)} placeholder="B.S. Computer Science" />
            </div>
            <div>
              <label className="label-field">School</label>
              <input className="input-field" value={e.school} onChange={(ev) => updateEdu(e.id, 'school', ev.target.value)} placeholder="UC Berkeley" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-field">Start Year</label>
              <input className="input-field" value={e.startDate} onChange={(ev) => updateEdu(e.id, 'startDate', ev.target.value)} placeholder="2014" />
            </div>
            <div>
              <label className="label-field">End Year</label>
              <input className="input-field" value={e.endDate} onChange={(ev) => updateEdu(e.id, 'endDate', ev.target.value)} placeholder="2018" />
            </div>
          </div>
          <div>
            <label className="label-field">Location</label>
            <input className="input-field" value={e.location} onChange={(ev) => updateEdu(e.id, 'location', ev.target.value)} placeholder="Berkeley, CA" />
          </div>
          <div>
            <label className="label-field">Details</label>
            <input className="input-field" value={e.details} onChange={(ev) => updateEdu(e.id, 'details', ev.target.value)} placeholder="GPA, honors, relevant coursework..." />
          </div>
        </div>
      ))}
      <button onClick={addEdu} className="btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Education
      </button>
    </div>
  );
}

function SkillsForm({ data, setData }: { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>> }) {
  const [input, setInput] = useState('');
  const addSkill = () => {
    if (!input.trim()) return;
    const newSkill: Skill = { id: genId(), name: input.trim(), level: 'Intermediate' };
    setData((d) => ({ ...d, skills: [...d.skills, newSkill] }));
    setInput('');
  };
  const removeSkill = (id: string) => setData((d) => ({ ...d, skills: d.skills.filter((s) => s.id !== id) }));
  const updateSkillLevel = (id: string, level: string) => {
    setData((d) => ({ ...d, skills: d.skills.map((s) => s.id === id ? { ...s, level } : s) }));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          placeholder="Type a skill and press Enter..."
        />
        <button onClick={addSkill} className="btn-primary shrink-0">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {data.skills.map((s) => (
          <div key={s.id} className="flex items-center gap-2 px-3 py-2 rounded-full border border-ink-200 bg-ink-50">
            <span className="text-sm font-medium text-ink-800 flex-1">{s.name}</span>
            <select
              value={s.level}
              onChange={(e) => updateSkillLevel(s.id, e.target.value)}
              className="text-xs px-2 py-1 rounded-full border border-ink-200 bg-white text-ink-600 focus:outline-none focus:ring-1 focus:ring-brand-400"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
            <button onClick={() => removeSkill(s.id)} className="text-ink-400 hover:text-rose-500 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsForm({ data, setData }: { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>> }) {
  const addProj = () => {
    const newProj: Project = { id: genId(), name: '', description: '', techStack: [], link: '' };
    setData((d) => ({ ...d, projects: [...d.projects, newProj] }));
  };
  const removeProj = (id: string) => setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));
  const updateProj = (id: string, field: keyof Project, value: string | string[]) => {
    setData((d) => ({ ...d, projects: d.projects.map((p) => p.id === id ? { ...p, [field]: value } : p) }));
  };

  return (
    <div className="space-y-3">
      {data.projects.map((p) => (
        <div key={p.id} className="border border-ink-200 rounded-2xl p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-800">{p.name || 'New Project'}</span>
            <button onClick={() => removeProj(p.id)} className="text-ink-400 hover:text-rose-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div>
            <label className="label-field">Project Name</label>
            <input className="input-field" value={p.name} onChange={(e) => updateProj(p.id, 'name', e.target.value)} placeholder="OpenMetrics" />
          </div>
          <div>
            <label className="label-field">Description</label>
            <textarea className="input-field min-h-[60px] resize-y" value={p.description} onChange={(e) => updateProj(p.id, 'description', e.target.value)} placeholder="Open-source analytics dashboard..." />
          </div>
          <div>
            <label className="label-field">Tech Stack (comma separated)</label>
            <input
              className="input-field"
              value={p.techStack.join(', ')}
              onChange={(e) => updateProj(p.id, 'techStack', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>
          <div>
            <label className="label-field">Link</label>
            <input className="input-field" value={p.link} onChange={(e) => updateProj(p.id, 'link', e.target.value)} placeholder="github.com/..." />
          </div>
        </div>
      ))}
      <button onClick={addProj} className="btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Project
      </button>
    </div>
  );
}

function CertificationsForm({ data, setData }: { data: ResumeData; setData: React.Dispatch<React.SetStateAction<ResumeData>> }) {
  const addCert = () => {
    const newCert: Certification = { id: genId(), name: '', issuer: '', date: '' };
    setData((d) => ({ ...d, certifications: [...d.certifications, newCert] }));
  };
  const removeCert = (id: string) => setData((d) => ({ ...d, certifications: d.certifications.filter((c) => c.id !== id) }));
  const updateCert = (id: string, field: keyof Certification, value: string) => {
    setData((d) => ({ ...d, certifications: d.certifications.map((c) => c.id === id ? { ...c, [field]: value } : c) }));
  };

  return (
    <div className="space-y-3">
      {data.certifications.map((c) => (
        <div key={c.id} className="border border-ink-200 rounded-2xl p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-800">{c.name || 'New Certification'}</span>
            <button onClick={() => removeCert(c.id)} className="text-ink-400 hover:text-rose-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div>
            <label className="label-field">Certification Name</label>
            <input className="input-field" value={c.name} onChange={(e) => updateCert(c.id, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-field">Issuer</label>
              <input className="input-field" value={c.issuer} onChange={(e) => updateCert(c.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
            </div>
            <div>
              <label className="label-field">Date</label>
              <input className="input-field" value={c.date} onChange={(e) => updateCert(c.id, 'date', e.target.value)} placeholder="2022" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={addCert} className="btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Certification
      </button>
    </div>
  );
}
