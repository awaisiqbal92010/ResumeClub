import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  { q: 'How do I create a resume?', a: 'Go to the Resume Builder, fill in your personal info, experience, education, and skills, then click Generate to create a polished, ATS-friendly resume. You can download it as a PDF instantly.' },
  { q: 'How does the AI resume builder work?', a: 'Resume.Club uses AI to generate resume content from your structured data. Fill in the form, click AI Generate, and the AI creates a professionally formatted resume you can edit live.' },
  { q: 'Are the templates ATS-friendly?', a: 'Yes! Every template is designed to be ATS-parsable. The compact template offers maximum keyword density with no graphics for the strictest ATS systems.' },
  { q: 'Can I edit my resume after generating it?', a: 'Absolutely. Your resume auto-saves as you type. You can return to the dashboard anytime, open any resume, and continue editing.' },
  { q: 'Is the PDF export really print-quality?', a: 'Yes. Our PDF export produces print-perfect, ATS-parsable documents ready to send to any employer.' },
  { q: 'Can I tailor my resume to a specific job?', a: 'Yes! Use the AI Job Matcher to paste a job description and let AI tailor your resume to mirror its keywords.' },
  { q: 'How does the AI cover letter builder work?', a: 'Select one of your saved resumes, enter the company and job title, optionally paste the job description, and the AI generates a tailored cover letter you can save and download as a PDF.' },
  { q: 'How do I connect Resume.Club to Claude, ChatGPT, or Cursor?', a: 'Visit the Connect AI page for step-by-step instructions for each MCP-compatible client. You will copy a server URL and paste it into your preferred AI assistant.' },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="container-page pt-28 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">Help Center</h1>
        <p className="mt-4 text-lg text-ink-600">FAQs & support resources to help you get the most out of Resume.Club.</p>
      </div>

      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
          <input
            className="input-field pl-10"
            placeholder="Search for help..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {filtered.map((faq, i) => (
          <div key={i} className="card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-ink-900">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-ink-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-ink-600 leading-relaxed animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="text-ink-600">Still need help?</p>
        <Link to="/contact" className="btn-primary mt-4">Contact Support</Link>
      </div>
    </div>
  );
}
