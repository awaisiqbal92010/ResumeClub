export default function TermsPage() {
  const sections = [
    { title: 'Acceptance of Terms', body: 'By accessing or using Resume.Club, you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.' },
    { title: 'Use of the Service', body: 'You may use Resume.Club for your personal and professional job search. You agree not to disrupt or compromise the Service\'s security, and to provide accurate information when creating your account.' },
    { title: 'Your Account', body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate information when creating your account.' },
    { title: 'Content Ownership', body: 'You retain ownership of the content you create using Resume.Club. We grant you a license to use the templates and tools provided by the Service for your personal and professional use.' },
    { title: 'Pricing and Billing', body: 'The Free plan is available at no cost. The Pro plan is available for $12/month. Subscriptions can be cancelled at any time. Fees are non-refundable except where required by law.' },
    { title: 'Limitation of Liability', body: 'Resume.Club shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.' },
    { title: 'Age Requirement', body: 'Resume.Club is not intended for users under 16. We do not knowingly collect data from children.' },
    { title: 'Changes to Terms', body: 'We may update these Terms from time to time. We will notify you of significant changes via email or in-app notification.' },
  ];

  return (
    <div className="container-page pt-28 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">Terms of Service</h1>
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
          If you have questions about these Terms, please <a href="/contact" className="text-brand-600 hover:underline">contact us</a>.
        </p>
      </div>
    </div>
  );
}
