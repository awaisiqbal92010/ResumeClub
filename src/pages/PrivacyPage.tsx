export default function PrivacyPage() {
  const sections = [
    { title: 'Information We Collect', body: 'We collect your name, email address, and resume data you provide when using the Service. This includes personal information, work experience, education, and skills you enter into the resume builder.' },
    { title: 'How We Use Your Data', body: 'To provide and improve the resume building and AI generation features. To track portfolio views for your analytics dashboard. To provide customer support when you contact us.' },
    { title: 'Data Storage and Security', body: 'Your data is stored securely on our servers. We use encryption in transit and at rest. Access to your data is restricted to authorized personnel. We do not sell your personal information to third parties.' },
    { title: 'Data Retention', body: 'We retain your resume data for as long as your account is active. You can delete individual resumes, cover letters, and portfolios at any time. Deleting your account removes all associated data.' },
    { title: 'Cookies', body: 'We use cookies to maintain your session and improve the Service. Analytics cookies help us understand how the Service is used. You can manage cookie preferences in your browser settings.' },
    { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal data. You can export your resume data at any time. To exercise these rights, contact us.' },
    { title: 'Third-Party Services', body: 'We do not share your personal information with third parties. We never share your information, and you can delete your resumes at any time from the dashboard.' },
    { title: 'Children\'s Privacy', body: 'Resume.Club is not intended for users under 16. We do not knowingly collect data from children.' },
    { title: 'Updates to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes via email or in-app notification.' },
  ];

  return (
    <div className="container-page pt-28 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">Privacy Policy</h1>
        <p className="text-sm text-ink-400 mt-2">Last updated: August 2026</p>
        <div className="mt-8 space-y-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-ink-900 mb-2">{s.title}</h2>
              <p className="text-sm text-ink-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink-500">
          If you have questions about this Privacy Policy, please <a href="/contact" className="text-brand-600 hover:underline">contact us</a>.
        </p>
      </div>
    </div>
  );
}
