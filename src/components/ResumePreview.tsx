import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { ResumeData } from '@/types/resume';
import { dateRange } from '@/lib/utils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
  accentColor: string;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template, accentColor }, ref) => {
    if (template === 'modern') return <ModernTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'minimal') return <MinimalTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'classic') return <ClassicTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'technical') return <TechnicalTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'creative') return <CreativeTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'compact') return <CompactTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'executive') return <ExecutiveTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'harvard') return <HarvardTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'stanford') return <StanfordTemplate ref={ref} data={data} accent={accentColor} />;
    if (template === 'atsexpert') return <ATSExpertTemplate ref={ref} data={data} accent={accentColor} />;
    return <ModernTemplate ref={ref} data={data} accent={accentColor} />;
  }
);

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;

/* ============ PHOTO HELPER ============ */
function Photo({ src, alt, className, fallbackClassName, style }: { src?: string; alt: string; className?: string; fallbackClassName?: string; style?: CSSProperties }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style ?? (fallbackClassName ? undefined : { objectFit: 'cover' })}
    />
  );
}

/* ============ MODERN ============ */
const ModernTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-sans text-ink-900" style={{ fontSize: '14px' }}>
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/3 p-6 space-y-6" style={{ backgroundColor: `${accent}08` }}>
            {p.photo && (
              <div className="flex justify-center">
                <Photo src={p.photo} alt={p.fullName} className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold leading-tight" style={{ color: accent }}>
                {p.fullName || 'Your Name'}
              </h1>
              <p className="text-sm font-medium text-ink-600 mt-1">{p.professionalTitle || 'Professional Title'}</p>
            </div>

            <div className="space-y-2 text-xs text-ink-600">
              {p.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 shrink-0" style={{ color: accent }} /> {p.email}</div>}
              {p.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 shrink-0" style={{ color: accent }} /> {p.phone}</div>}
              {p.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 shrink-0" style={{ color: accent }} /> {p.location}</div>}
              {p.website && <div className="flex items-center gap-2"><Globe className="w-3 h-3 shrink-0" style={{ color: accent }} /> {p.website}</div>}
              {p.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-3 h-3 shrink-0" style={{ color: accent }} /> {p.linkedin}</div>}
              {p.github && <div className="flex items-center gap-2"><Github className="w-3 h-3 shrink-0" style={{ color: accent }} /> {p.github}</div>}
            </div>

            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Skills</h2>
                <div className="space-y-1.5">
                  {skills.map((s) => (
                    <div key={s.id} className="flex justify-between text-xs">
                      <span className="text-ink-700 font-medium">{s.name}</span>
                      <span className="text-ink-400">{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Education</h2>
                <div className="space-y-3">
                  {education.map((e) => (
                    <div key={e.id}>
                      <p className="text-xs font-semibold text-ink-800">{e.degree}</p>
                      <p className="text-xs text-ink-600">{e.school}</p>
                      <p className="text-xs text-ink-400">{dateRange(e.startDate, e.endDate, false)}</p>
                      {e.details && <p className="text-xs text-ink-500 mt-0.5">{e.details}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Certifications</h2>
                <div className="space-y-1.5">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <p className="text-xs font-semibold text-ink-800">{c.name}</p>
                      <p className="text-xs text-ink-500">{c.issuer} — {c.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main */}
          <div className="w-2/3 p-6 space-y-5">
            {summary && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Summary</h2>
                <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
              </div>
            )}

            {experience.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <p className="text-xs font-bold text-ink-900">{exp.jobTitle}</p>
                        <p className="text-xs text-ink-400">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                      </div>
                      <p className="text-xs font-medium" style={{ color: accent }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                      <ul className="mt-1.5 space-y-1">
                        {exp.bulletPoints.filter(Boolean).map((b, i) => (
                          <li key={i} className="text-xs text-ink-600 leading-relaxed pl-3 relative">
                            <span style={{ color: accent }} className="absolute left-0 top-1.5 w-1 h-1 rounded-full block" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Projects</h2>
                <div className="space-y-2">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <p className="text-xs font-bold text-ink-900">{proj.name}</p>
                      <p className="text-xs text-ink-600">{proj.description}</p>
                      {proj.techStack.length > 0 && (
                        <p className="text-xs text-ink-400 mt-0.5">Tech: {proj.techStack.join(' · ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
ModernTemplate.displayName = 'ModernTemplate';

/* ============ MINIMAL ============ */
const MinimalTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-sans text-ink-900 p-10" style={{ fontSize: '14px' }}>
        <div className="text-center mb-6">
          {p.photo && (
            <div className="flex justify-center mb-4">
              <Photo src={p.photo} alt={p.fullName} className="w-24 h-24 rounded-full object-cover" />
            </div>
          )}
          <h1 className="text-2xl font-light tracking-tight text-ink-900">{p.fullName || 'Your Name'}</h1>
          <p className="text-sm font-normal text-ink-500 mt-1">{p.professionalTitle || 'Professional Title'}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-xs text-ink-500">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.website && <span>{p.website}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
          </div>
          <div className="mt-4 h-px bg-ink-200" />
        </div>

        {summary && (
          <Section title="Summary" accent={accent} minimal>
            <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience" accent={accent} minimal>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-semibold text-ink-900">{exp.jobTitle}, <span className="font-normal text-ink-600">{exp.company}</span></p>
                    <p className="text-xs text-ink-400">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  {exp.location && <p className="text-xs text-ink-400">{exp.location}</p>}
                  <ul className="mt-1 space-y-1">
                    {exp.bulletPoints.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-xs text-ink-600 leading-relaxed">— {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects" accent={accent} minimal>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-xs font-semibold text-ink-900">{proj.name}</p>
                  <p className="text-xs text-ink-600">{proj.description}</p>
                  {proj.techStack.length > 0 && <p className="text-xs text-ink-400">{proj.techStack.join(', ')}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" accent={accent} minimal>
            <div className="space-y-2">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-semibold text-ink-900">{e.degree}, <span className="font-normal text-ink-600">{e.school}</span></p>
                    <p className="text-xs text-ink-400">{dateRange(e.startDate, e.endDate, false)}</p>
                  </div>
                  {e.details && <p className="text-xs text-ink-500">{e.details}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills" accent={accent} minimal>
            <p className="text-xs text-ink-700">{skills.map((s) => s.name).join(' · ')}</p>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications" accent={accent} minimal>
            <div className="space-y-1">
              {certifications.map((c) => (
                <p key={c.id} className="text-xs text-ink-700">{c.name} — {c.issuer} ({c.date})</p>
              ))}
            </div>
          </Section>
        )}
      </div>
    );
  }
);
MinimalTemplate.displayName = 'MinimalTemplate';

/* ============ CLASSIC ============ */
const ClassicTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-serif text-ink-900 p-10" style={{ fontSize: '14px' }}>
        <div className="text-center mb-6">
          {p.photo && (
            <div className="flex justify-center mb-4">
              <Photo src={p.photo} alt={p.fullName} className="w-28 h-28 rounded-full object-cover border-2" style={{ borderColor: accent }} />
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: accent }}>{p.fullName || 'Your Name'}</h1>
          <p className="text-sm font-normal text-ink-600 mt-1 italic">{p.professionalTitle || 'Professional Title'}</p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-xs text-ink-500">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>· {p.phone}</span>}
            {p.location && <span>· {p.location}</span>}
            {p.website && <span>· {p.website}</span>}
          </div>
          <div className="mt-4 h-0.5" style={{ backgroundColor: accent }} />
        </div>

        {summary && (
          <Section title="Professional Summary" accent={accent} classic>
            <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Work Experience" accent={accent} classic>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-ink-900">{exp.jobTitle}</p>
                    <p className="text-xs text-ink-500 italic">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  <p className="text-xs font-semibold text-ink-600 italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    {exp.bulletPoints.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-xs text-ink-700 leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" accent={accent} classic>
            <div className="space-y-2">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-ink-900">{e.degree}</p>
                    <p className="text-xs text-ink-500 italic">{dateRange(e.startDate, e.endDate, false)}</p>
                  </div>
                  <p className="text-xs font-semibold text-ink-600 italic">{e.school}{e.location && `, ${e.location}`}</p>
                  {e.details && <p className="text-xs text-ink-600 mt-0.5">{e.details}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills" accent={accent} classic>
            <p className="text-xs text-ink-700">{skills.map((s) => `${s.name} (${s.level})`).join(', ')}</p>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects" accent={accent} classic>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-sm font-bold text-ink-900">{proj.name}</p>
                  <p className="text-xs text-ink-700">{proj.description}</p>
                  {proj.techStack.length > 0 && <p className="text-xs text-ink-500 italic">{proj.techStack.join(', ')}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications" accent={accent} classic>
            <div className="space-y-1">
              {certifications.map((c) => (
                <p key={c.id} className="text-xs text-ink-700">{c.name}, {c.issuer} ({c.date})</p>
              ))}
            </div>
          </Section>
        )}
      </div>
    );
  }
);
ClassicTemplate.displayName = 'ClassicTemplate';

/* ============ TECHNICAL ============ */
const TechnicalTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-mono text-ink-900 p-10" style={{ fontSize: '13px' }}>
        <div className="mb-6 flex items-start gap-4">
          {p.photo && <Photo src={p.photo} alt={p.fullName} className="w-20 h-20 rounded-lg object-cover shrink-0" />}
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: accent }}>{p.fullName || 'Your Name'}</h1>
            <p className="text-sm font-medium text-ink-600 mt-1">{p.professionalTitle || 'Professional Title'}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-ink-500">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.location && <span>{p.location}</span>}
              {p.github && <span>{p.github}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
            <div className="mt-3 h-0.5 bg-ink-200" />
          </div>
        </div>

        {skills.length > 0 && (
          <Section title="Technical Skills" accent={accent} technical>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s.id} className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: `${accent}12`, color: accent, border: `1px solid ${accent}30` }}>
                  {s.name}
                </span>
              ))}
            </div>
          </Section>
        )}

        {summary && (
          <Section title="Summary" accent={accent} technical>
            <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience" accent={accent} technical>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-ink-900">{exp.jobTitle} @ <span style={{ color: accent }}>{exp.company}</span></p>
                    <p className="text-xs text-ink-400">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  <ul className="mt-1 space-y-1">
                    {exp.bulletPoints.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-xs text-ink-600 leading-relaxed">
                        <span style={{ color: accent }}>▸</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects" accent={accent} technical>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-sm font-bold text-ink-900">{proj.name}</p>
                  <p className="text-xs text-ink-600">{proj.description}</p>
                  {proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.techStack.map((t, i) => (
                        <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-ink-100 text-ink-600">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" accent={accent} technical>
            <div className="space-y-2">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-ink-900">{e.degree}</p>
                    <p className="text-xs text-ink-400">{dateRange(e.startDate, e.endDate, false)}</p>
                  </div>
                  <p className="text-xs text-ink-600">{e.school}</p>
                  {e.details && <p className="text-xs text-ink-500">{e.details}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications" accent={accent} technical>
            <div className="space-y-1">
              {certifications.map((c) => (
                <p key={c.id} className="text-xs text-ink-700">{c.name} — {c.issuer} ({c.date})</p>
              ))}
            </div>
          </Section>
        )}
      </div>
    );
  }
);
TechnicalTemplate.displayName = 'TechnicalTemplate';

/* ============ CREATIVE ============ */
const CreativeTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-sans text-ink-900" style={{ fontSize: '14px' }}>
        <div className="p-8 flex items-center gap-6" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
          {p.photo && <Photo src={p.photo} alt={p.fullName} className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30 shadow-lg shrink-0" />}
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{p.fullName || 'Your Name'}</h1>
            <p className="text-base font-medium text-white/90 mt-1">{p.professionalTitle || 'Professional Title'}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-white/80">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.location && <span>{p.location}</span>}
              {p.website && <span>{p.website}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-5">
          {summary && (
            <Section title="About Me" accent={accent} creative>
              <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
            </Section>
          )}

          {experience.length > 0 && (
            <Section title="Experience" accent={accent} creative>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l-2" style={{ borderColor: accent }}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-ink-900">{exp.jobTitle}</p>
                      <p className="text-xs text-ink-400">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: accent }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                    <ul className="mt-1.5 space-y-1">
                      {exp.bulletPoints.filter(Boolean).map((b, i) => (
                        <li key={i} className="text-xs text-ink-600 leading-relaxed">• {b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <div className="grid grid-cols-2 gap-6">
            {skills.length > 0 && (
              <Section title="Skills" accent={accent} creative>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s.id} className="text-xs px-2 py-1 rounded-lg font-medium" style={{ backgroundColor: `${accent}15`, color: accent }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {education.length > 0 && (
              <Section title="Education" accent={accent} creative>
                <div className="space-y-2">
                  {education.map((e) => (
                    <div key={e.id}>
                      <p className="text-xs font-bold text-ink-900">{e.degree}</p>
                      <p className="text-xs text-ink-600">{e.school}</p>
                      <p className="text-xs text-ink-400">{dateRange(e.startDate, e.endDate, false)}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {projects.length > 0 && (
            <Section title="Projects" accent={accent} creative>
              <div className="grid grid-cols-2 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-xl" style={{ backgroundColor: `${accent}08` }}>
                    <p className="text-xs font-bold text-ink-900">{proj.name}</p>
                    <p className="text-xs text-ink-600 mt-0.5">{proj.description}</p>
                    {proj.techStack.length > 0 && <p className="text-xs text-ink-400 mt-1">{proj.techStack.join(' · ')}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {certifications.length > 0 && (
            <Section title="Certifications" accent={accent} creative>
              <div className="space-y-1">
                {certifications.map((c) => (
                  <p key={c.id} className="text-xs text-ink-700">{c.name} — {c.issuer} ({c.date})</p>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    );
  }
);
CreativeTemplate.displayName = 'CreativeTemplate';

/* ============ COMPACT ============ */
const CompactTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-sans text-ink-900 p-8" style={{ fontSize: '12px' }}>
        <div className="mb-4 flex items-center gap-4">
          {p.photo && <Photo src={p.photo} alt={p.fullName} className="w-16 h-16 rounded-full object-cover shrink-0" />}
          <div>
            <h1 className="text-xl font-bold tracking-tight text-ink-900">{p.fullName || 'Your Name'}</h1>
            <p className="text-sm font-medium text-ink-600">{p.professionalTitle || 'Professional Title'}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-ink-500">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>| {p.phone}</span>}
              {p.location && <span>| {p.location}</span>}
              {p.website && <span>| {p.website}</span>}
              {p.linkedin && <span>| {p.linkedin}</span>}
            </div>
          </div>
        </div>

        {summary && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>Summary</h2>
            <p className="text-xs text-ink-700 leading-snug">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: accent }}>Experience</h2>
            <div className="space-y-2">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-bold text-ink-900">{exp.jobTitle} — {exp.company}</p>
                    <p className="text-xs text-ink-400">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  <ul className="mt-0.5 space-y-0.5">
                    {exp.bulletPoints.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-xs text-ink-600 leading-snug">• {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-3">
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>Education</h2>
              <div className="space-y-1">
                {education.map((e) => (
                  <div key={e.id}>
                    <p className="text-xs font-bold text-ink-900">{e.degree}</p>
                    <p className="text-xs text-ink-600">{e.school} | {dateRange(e.startDate, e.endDate, false)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>Skills</h2>
              <p className="text-xs text-ink-700 leading-snug">{skills.map((s) => s.name).join(', ')}</p>
            </div>
          )}
        </div>

        {projects.length > 0 && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>Projects</h2>
            <div className="space-y-1">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-xs font-bold text-ink-900">{proj.name}</p>
                  <p className="text-xs text-ink-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>Certifications</h2>
            <p className="text-xs text-ink-700">{certifications.map((c) => `${c.name} (${c.issuer}, ${c.date})`).join('; ')}</p>
          </div>
        )}
      </div>
    );
  }
);
CompactTemplate.displayName = 'CompactTemplate';

/* ============ EXECUTIVE ============ */
const ExecutiveTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-serif text-ink-900 px-12 py-10" style={{ fontSize: '13px' }}>
        <div className="text-center mb-6">
          {p.photo && (
            <div className="flex justify-center mb-3">
              <Photo src={p.photo} alt={p.fullName} className="w-24 h-24 rounded-full object-cover border-2" style={{ borderColor: accent }} />
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-wide uppercase" style={{ color: accent }}>{p.fullName || 'Your Name'}</h1>
          <p className="text-sm font-normal text-ink-600 mt-1 tracking-widest uppercase">{p.professionalTitle || 'Professional Title'}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-xs text-ink-500">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>· {p.phone}</span>}
            {p.location && <span>· {p.location}</span>}
            {p.linkedin && <span>· {p.linkedin}</span>}
          </div>
          <div className="mt-3 h-0.5 bg-ink-300" />
        </div>

        {summary && (
          <Section title="Executive Summary" accent={accent} classic>
            <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Professional Experience" accent={accent} classic>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>{exp.jobTitle}</p>
                    <p className="text-xs text-ink-500 italic">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  <p className="text-xs font-semibold text-ink-700 uppercase tracking-wide">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    {exp.bulletPoints.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-xs text-ink-700 leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" accent={accent} classic>
            <div className="space-y-2">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-ink-900">{e.degree}</p>
                    <p className="text-xs text-ink-500 italic">{dateRange(e.startDate, e.endDate, false)}</p>
                  </div>
                  <p className="text-xs font-semibold text-ink-600">{e.school}{e.location && `, ${e.location}`}</p>
                  {e.details && <p className="text-xs text-ink-600 mt-0.5">{e.details}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Core Competencies" accent={accent} classic>
            <div className="grid grid-cols-3 gap-1">
              {skills.map((s) => (
                <p key={s.id} className="text-xs text-ink-700">{s.name}</p>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications & Awards" accent={accent} classic>
            <div className="space-y-1">
              {certifications.map((c) => (
                <p key={c.id} className="text-xs text-ink-700">{c.name}, {c.issuer} ({c.date})</p>
              ))}
            </div>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Key Initiatives" accent={accent} classic>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-sm font-bold text-ink-900">{proj.name}</p>
                  <p className="text-xs text-ink-700">{proj.description}</p>
                  {proj.techStack.length > 0 && <p className="text-xs text-ink-500 italic">{proj.techStack.join(', ')}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    );
  }
);
ExecutiveTemplate.displayName = 'ExecutiveTemplate';

/* ============ HARVARD ============ */
const HarvardTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-serif text-ink-900 pl-12 pr-10 py-10" style={{ fontSize: '13px' }}>
        <div className="border-l-2 pl-6 mb-6" style={{ borderColor: accent }}>
          {p.photo && (
            <div className="float-right ml-4 mb-2">
              <Photo src={p.photo} alt={p.fullName} className="w-20 h-20 rounded-full object-cover" />
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">{p.fullName || 'Your Name'}</h1>
          <p className="text-sm text-ink-600 mt-1">{p.professionalTitle || 'Professional Title'}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-ink-500">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>· {p.phone}</span>}
            {p.location && <span>· {p.location}</span>}
            {p.website && <span>· {p.website}</span>}
            {p.linkedin && <span>· {p.linkedin}</span>}
          </div>
        </div>

        {summary && (
          <Section title="Summary" accent={accent} classic>
            <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" accent={accent} classic>
            <div className="space-y-2">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-ink-900">{e.degree}</p>
                    <p className="text-xs text-ink-500">{dateRange(e.startDate, e.endDate, false)}</p>
                  </div>
                  <p className="text-xs text-ink-600">{e.school}{e.location && `, ${e.location}`}</p>
                  {e.details && <p className="text-xs text-ink-500 mt-0.5">{e.details}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience" accent={accent} classic>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-ink-900">{exp.jobTitle}</p>
                    <p className="text-xs text-ink-500">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  <p className="text-xs font-semibold text-ink-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    {exp.bulletPoints.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-xs text-ink-700 leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills" accent={accent} classic>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {skills.map((s) => (
                <p key={s.id} className="text-xs text-ink-700">{s.name}</p>
              ))}
            </div>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects" accent={accent} classic>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-sm font-bold text-ink-900">{proj.name}</p>
                  <p className="text-xs text-ink-700">{proj.description}</p>
                  {proj.techStack.length > 0 && <p className="text-xs text-ink-500">{proj.techStack.join(', ')}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications" accent={accent} classic>
            <div className="space-y-1">
              {certifications.map((c) => (
                <p key={c.id} className="text-xs text-ink-700">{c.name} — {c.issuer} ({c.date})</p>
              ))}
            </div>
          </Section>
        )}
      </div>
    );
  }
);
HarvardTemplate.displayName = 'HarvardTemplate';

/* ============ STANFORD ============ */
const StanfordTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-serif text-ink-900 px-10 py-10" style={{ fontSize: '13px' }}>
        <div className="mb-6 flex items-start gap-5">
          {p.photo && <Photo src={p.photo} alt={p.fullName} className="w-20 h-20 rounded-lg object-cover shrink-0" />}
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: accent }}>{p.fullName || 'Your Name'}</h1>
            <p className="text-sm text-ink-600 mt-0.5">{p.professionalTitle || 'Professional Title'}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-ink-500">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>· {p.phone}</span>}
              {p.location && <span>· {p.location}</span>}
              {p.website && <span>· {p.website}</span>}
              {p.linkedin && <span>· {p.linkedin}</span>}
              {p.github && <span>· {p.github}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-5">
            {summary && (
              <Section title="Summary" accent={accent} classic>
                <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
              </Section>
            )}

            {experience.length > 0 && (
              <Section title="Experience" accent={accent} classic>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-bold text-ink-900">{exp.jobTitle}</p>
                        <p className="text-xs text-ink-500 italic">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                      </div>
                      <p className="text-xs font-semibold text-ink-600 italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                      <ul className="mt-1 space-y-1 list-disc list-inside">
                        {exp.bulletPoints.filter(Boolean).map((b, i) => (
                          <li key={i} className="text-xs text-ink-700 leading-relaxed">{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {projects.length > 0 && (
              <Section title="Projects" accent={accent} classic>
                <div className="space-y-2">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <p className="text-sm font-bold text-ink-900">{proj.name}</p>
                      <p className="text-xs text-ink-700">{proj.description}</p>
                      {proj.techStack.length > 0 && <p className="text-xs text-ink-500 italic">{proj.techStack.join(', ')}</p>}
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          <div className="space-y-5">
            {education.length > 0 && (
              <Section title="Education" accent={accent} classic>
                <div className="space-y-2">
                  {education.map((e) => (
                    <div key={e.id}>
                      <p className="text-xs font-bold text-ink-900">{e.degree}</p>
                      <p className="text-xs text-ink-600">{e.school}</p>
                      <p className="text-xs text-ink-500">{dateRange(e.startDate, e.endDate, false)}</p>
                      {e.details && <p className="text-xs text-ink-500 mt-0.5">{e.details}</p>}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {skills.length > 0 && (
              <Section title="Skills" accent={accent} classic>
                <div className="space-y-1">
                  {skills.map((s) => (
                    <p key={s.id} className="text-xs text-ink-700">{s.name}</p>
                  ))}
                </div>
              </Section>
            )}

            {certifications.length > 0 && (
              <Section title="Certifications" accent={accent} classic>
                <div className="space-y-1">
                  {certifications.map((c) => (
                    <p key={c.id} className="text-xs text-ink-700">{c.name}<br /><span className="text-ink-500">{c.issuer}, {c.date}</span></p>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    );
  }
);
StanfordTemplate.displayName = 'StanfordTemplate';

/* ============ ATS EXPERT ============ */
const ATSExpertTemplate = forwardRef<HTMLDivElement, { data: ResumeData; accent: string }>(
  ({ data, accent }, ref) => {
    const { personalInfo: p, summary, experience, education, skills, projects, certifications } = data;
    return (
      <div ref={ref} className="bg-white w-full min-h-[800px] font-sans text-ink-900 px-10 py-10" style={{ fontSize: '13px' }}>
        <div className="mb-5 flex items-start gap-4">
          {p.photo && <Photo src={p.photo} alt={p.fullName} className="w-20 h-20 rounded-lg object-cover shrink-0" />}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-ink-900">{p.fullName || 'Your Name'}</h1>
            <p className="text-sm font-semibold text-ink-700 mt-0.5">{p.professionalTitle || 'Professional Title'}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-ink-600">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>· {p.phone}</span>}
              {p.location && <span>· {p.location}</span>}
              {p.website && <span>· {p.website}</span>}
              {p.linkedin && <span>· {p.linkedin}</span>}
              {p.github && <span>· {p.github}</span>}
            </div>
          </div>
        </div>

        <div className="h-px mb-4" style={{ backgroundColor: accent }} />

        {summary && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-1.5 text-ink-900">Professional Summary</h2>
            <p className="text-xs text-ink-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-1.5 text-ink-900">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {skills.map((s, i) => (
                <span key={s.id} className="text-xs text-ink-700">
                  {s.name}{i < skills.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2 text-ink-900">Work Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-bold text-ink-900">{exp.jobTitle} | {exp.company}</p>
                    <p className="text-xs text-ink-600">{dateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  {exp.location && <p className="text-xs text-ink-600">{exp.location}</p>}
                  <ul className="mt-1 space-y-0.5">
                    {exp.bulletPoints.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-xs text-ink-700 leading-relaxed">- {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2 text-ink-900">Education</h2>
            <div className="space-y-2">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-bold text-ink-900">{e.degree}</p>
                    <p className="text-xs text-ink-600">{dateRange(e.startDate, e.endDate, false)}</p>
                  </div>
                  <p className="text-xs text-ink-700">{e.school}{e.location && `, ${e.location}`}</p>
                  {e.details && <p className="text-xs text-ink-600 mt-0.5">{e.details}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2 text-ink-900">Projects</h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-xs font-bold text-ink-900">{proj.name}</p>
                  <p className="text-xs text-ink-700">{proj.description}</p>
                  {proj.techStack.length > 0 && <p className="text-xs text-ink-600">Technologies: {proj.techStack.join(', ')}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2 text-ink-900">Certifications</h2>
            <div className="space-y-1">
              {certifications.map((c) => (
                <p key={c.id} className="text-xs text-ink-700">{c.name} - {c.issuer}, {c.date}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);
ATSExpertTemplate.displayName = 'ATSExpertTemplate';

/* ============ SHARED SECTION ============ */
function Section({ title, accent, children, minimal, classic, technical, creative }: {
  title: string;
  accent: string;
  children: React.ReactNode;
  minimal?: boolean;
  classic?: boolean;
  technical?: boolean;
  creative?: boolean;
}) {
  return (
    <div className="mb-5">
      <h2
        className={`text-sm font-bold uppercase tracking-wider mb-2 ${
          technical ? 'font-mono' : classic ? 'font-serif' : ''
        }`}
        style={{
          color: accent,
          borderBottom: minimal || technical ? '1px solid rgb(226 232 240)' : creative ? `2px solid ${accent}` : `1px solid ${accent}`,
          paddingBottom: '4px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
