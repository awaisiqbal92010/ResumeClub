import { useState } from 'react';
import { Bot, ChevronDown, MessageCircle, Send, X } from 'lucide-react';

const answers: Record<string, string> = {
  'What makes a resume ATS-friendly?': 'Use standard headings, simple layouts, readable fonts, exact job-description keywords, and measurable achievements. Avoid text inside images or decorative graphics.',
  'Which CV template fits my field?': 'Choose a template from the occupation library by field. Technical roles benefit from structured skill sections, while creative roles can use a visual header without sacrificing readable text.',
  'How should I write my summary?': 'Name your role, years or level of experience, strongest specialties, and one result you can prove. Keep it to two or three sentences tailored to the job.',
};

export default function CareerAssistant() {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const questions = Object.keys(answers);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-40px))] rounded-2xl border border-ink-200 bg-white shadow-float overflow-hidden">
          <div className="flex items-center justify-between bg-ink-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2"><Bot className="h-4 w-4 text-accent-300" /><span className="text-sm font-bold">Career Assistant</span></div>
            <button aria-label="Close career assistant" onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="p-4">
            <p className="text-sm leading-relaxed text-ink-600">Ask a quick question about resumes, templates, or ATS screening.</p>
            <div className="mt-3 space-y-2">
              {questions.map((question) => (
                <button key={question} onClick={() => setSelectedQuestion(question)} className="w-full rounded-xl border border-ink-200 px-3 py-2 text-left text-xs font-medium text-ink-700 transition-colors hover:border-brand-400 hover:bg-brand-50">
                  {question}
                </button>
              ))}
            </div>
            {selectedQuestion && (
              <div className="mt-3 rounded-xl bg-ink-50 p-3 text-xs leading-relaxed text-ink-700">
                <div className="mb-1 flex items-center gap-1 font-semibold text-brand-700"><MessageCircle className="h-3 w-3" /> Answer</div>
                {answers[selectedQuestion]}
              </div>
            )}
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs text-ink-400"><Send className="h-3 w-3" /> More AI guidance is coming soon</div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((value) => !value)} aria-label="Open career assistant" className="ml-auto flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-700">
        <Bot className="h-5 w-5" /> <span className="hidden sm:inline">Career Assistant</span><ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
