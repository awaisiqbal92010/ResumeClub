import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const sections = [
    {
      title: 'Product',
      links: [
        { to: '/builder', label: 'Resume Builder' },
        { to: '/templates', label: 'Templates' },
        { to: '/dashboard', label: 'Dashboard' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { to: '/blog', label: 'Blog' },
        { to: '/career-resources', label: 'Career Resources' },
        { to: '/interview-tips', label: 'Interview Tips' },
        { to: '/support', label: 'Help Center' },
      ],
    },
    {
      title: 'Company',
      links: [
        { to: '/contact', label: 'Contact' },
        { to: '/terms', label: 'Terms of Service' },
        { to: '/privacy', label: 'Privacy Policy' },
      ],
    },
  ];

  return (
    <footer className="bg-ink-900 text-ink-300 mt-20">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center mb-4 rounded-xl bg-white/95 px-3 py-2">
              <img src="/Gemini_Generated_Image_2z1yxr2z1yxr2z1y-removebg-preview.png" alt="Resume.Club" className="h-9 w-auto max-w-[180px] object-contain" />
            </Link>
            <p className="text-sm text-ink-400 max-w-xs leading-relaxed">
              AI-powered resume and portfolio builder. Create job-winning, ATS-friendly resumes in minutes.
            </p>
            <div className="flex gap-3 mt-6">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-ink-800 hover:bg-brand-600 flex items-center justify-center transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4 text-ink-300" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ink-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-500">
            &copy; {new Date().getFullYear()} Resume.Club. All rights reserved.
          </p>
          <p className="text-sm text-ink-500">
            Trusted by 50,000+ job seekers
          </p>
        </div>
      </div>
    </footer>
  );
}
