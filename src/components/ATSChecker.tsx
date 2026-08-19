import { useState, useMemo } from 'react';
import { ShieldCheck, AlertTriangle, X, Check, TrendingUp, Lightbulb, Target, RefreshCw } from 'lucide-react';
import { calculateATSScore } from '@/lib/ats-scoring';
import type { ResumeData } from '@/types/resume';

interface ATSCheckerProps {
  data: ResumeData;
}

export default function ATSChecker({ data }: ATSCheckerProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [hasRun, setHasRun] = useState(false);

  const result = useMemo(
    () => calculateATSScore(data, hasRun ? jobDescription : undefined),
    [data, jobDescription, hasRun]
  );

  const scoreColor =
    result.score >= 80 ? 'text-emerald-600'
    : result.score >= 60 ? 'text-amber-500'
    : 'text-rose-500';

  const ringColor =
    result.score >= 80 ? '#10B981'
    : result.score >= 60 ? '#F59E0B'
    : '#F43F5E';

  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference - (result.score / 100) * circumference;

  return (
    <div className="space-y-5">
      {/* Score Ring */}
      <div className="card p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-brand-600" />
          <h3 className="font-bold text-ink-900">ATS Score Checker</h3>
        </div>

        <div className="relative inline-flex items-center justify-center">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#E2E8F0" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={ringColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-extrabold ${scoreColor}`}>{result.score}</span>
            <span className="text-xs text-ink-400 font-medium">out of 100</span>
          </div>
        </div>

        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: `${ringColor}15`, color: ringColor }}>
          Grade: {result.grade}
        </div>

        {result.missingSections.length > 0 && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-rose-50 text-left">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-700">
              Missing: {result.missingSections.join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Job Description Matcher */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-accent-500" />
          <h4 className="font-semibold text-sm text-ink-900">Job Description Match</h4>
        </div>
        <textarea
          className="input-field min-h-[80px] resize-y text-xs"
          placeholder="Paste a job description here to get a keyword match score..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button
          onClick={() => setHasRun(true)}
          className="btn-secondary w-full mt-3 text-xs"
          disabled={!jobDescription.trim()}
        >
          <RefreshCw className="w-3.5 h-3.5" /> Analyze Match
        </button>
      </div>

      {/* Detailed Checks */}
      <div className="card p-5">
        <h4 className="font-semibold text-sm text-ink-900 mb-3">Detailed Analysis</h4>
        <div className="space-y-2.5">
          {result.checks.map((check, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  check.passed ? 'bg-emerald-100' : 'bg-rose-100'
                }`}
              >
                {check.passed ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <X className="w-3 h-3 text-rose-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink-800">{check.label}</p>
                <p className="text-xs text-ink-500">{check.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h4 className="font-semibold text-sm text-ink-900">Suggestions to Improve</h4>
          </div>
          <ul className="space-y-2">
            {result.suggestions.map((s, i) => (
              <li key={i} className="text-xs text-ink-600 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-amber-400">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Keyword Density */}
      {result.keywordDensity.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-brand-500" />
            <h4 className="font-semibold text-sm text-ink-900">Keyword Density</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.keywordDensity.map((k) => (
              <span
                key={k.keyword}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: k.count >= 3 ? '#EEF2FF' : '#F1F5F9',
                  color: k.count >= 3 ? '#4F46E5' : '#64748B',
                }}
              >
                {k.keyword} ({k.count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
