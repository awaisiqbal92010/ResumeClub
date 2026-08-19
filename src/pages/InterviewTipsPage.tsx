import { Link } from 'react-router-dom';
import { MessageSquare, Clock, MapPin, ArrowRight, Check } from 'lucide-react';

const tips = [
  {
    category: 'General Questions',
    icon: MessageSquare,
    questions: [
      'Tell me about yourself.',
      'Why do you want to work here?',
      'What are your greatest strengths and weaknesses?',
      'Where do you see yourself in five years?',
    ],
  },
  {
    category: 'Behavioral Questions',
    icon: Check,
    questions: [
      'Tell me about a time you faced a conflict at work.',
      'Describe a project you are particularly proud of.',
      'Walk me through a time you failed and what you learned.',
      'Tell me about a time you had to meet a tight deadline.',
    ],
  },
  {
    category: 'Technical Questions',
    icon: Clock,
    questions: [
      'Walk me through a project you are particularly proud of.',
      'What tools and technologies do you use in your daily work?',
      'How do you approach debugging a complex issue?',
      'Describe a system you designed from scratch.',
    ],
  },
  {
    category: 'Experience Questions',
    icon: MapPin,
    questions: [
      'What is your most significant professional achievement?',
      'How do you prioritize competing tasks?',
      'Describe your experience working on a team.',
      'What is the most challenging problem you have solved?',
    ],
  },
];

const guides = [
  { title: 'How to Research a Company Before an Interview', desc: 'Study their mission, recent news, products, and culture. Check LinkedIn and Glassdoor for insider perspectives.' },
  { title: 'Use the STAR Method', desc: 'Structure behavioral answers: Situation, Task, Action, Result. This keeps your answers concise and impactful.' },
  { title: 'Prepare Questions', desc: 'Always have 3-5 thoughtful questions ready. It shows genuine interest and engagement.' },
  { title: 'Practice Out Loud', desc: 'Rehearse your answers. Speaking them aloud reveals awkward phrasing and builds confidence.' },
  { title: 'Quantify Your Impact', desc: 'Know every bullet point cold. Be ready to expand on any experience, project, or skill you listed.' },
  { title: 'Show Cultural Fit', desc: 'Research the company values and weave examples into your answers that demonstrate alignment.' },
];

export default function InterviewTipsPage() {
  return (
    <div className="container-page pt-28 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">Interview Tips & Questions</h1>
        <p className="mt-4 text-lg text-ink-600">
          Expert tips on resume writing, ATS optimization, job searching, and career growth.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {tips.map((tip) => (
          <div key={tip.category} className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                <tip.icon className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-ink-900">{tip.category}</h3>
            </div>
            <ul className="space-y-2.5">
              {tip.questions.map((q, i) => (
                <li key={i} className="text-sm text-ink-700 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-400">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-extrabold text-ink-900 mb-6">How to Prepare</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((g) => (
          <div key={g.title} className="card p-6">
            <h3 className="font-bold text-ink-900 mb-2">{g.title}</h3>
            <p className="text-sm text-ink-600 leading-relaxed">{g.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/builder" className="btn-primary text-base px-6 py-3">
          Build Your Resume First <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
