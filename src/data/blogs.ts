export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  keywords: string[];
  body: string[];
}

type Topic = [string, string, string, string, string[]];

const topics: Topic[] = [
  ['ATS Resume Keywords for Software Engineers', 'Technology', 'The technical keywords recruiters search for in engineering resumes, and how to use them naturally.', 'software engineer resume keywords', ['software engineer resume', 'ATS keywords', 'technical CV']],
  ['How to Write a Data Scientist Resume That Gets Interviews', 'Technology', 'Turn models, experiments, and business outcomes into evidence recruiters can understand.', 'data scientist resume writing', ['data science CV', 'machine learning resume']],
  ['The Best Resume Format for Frontend Developers', 'Technology', 'A practical structure for showing frontend skills, shipped products, and measurable impact.', 'frontend developer resume format', ['frontend CV', 'React resume']],
  ['Cloud Engineer Resume Guide: Skills, Projects, and Metrics', 'Technology', 'Build a cloud resume around reliability, scale, cost, and security instead of tool lists alone.', 'cloud engineer resume guide', ['cloud CV', 'AWS resume']],
  ['Cybersecurity Resume Examples and Common Mistakes', 'Technology', 'Show security judgment, incident response, and risk reduction with a clear ATS-friendly structure.', 'cybersecurity resume examples', ['security resume', 'SOC analyst CV']],
  ['How to Describe AI Projects on Your Resume', 'Technology', 'Use an AI project format that explains the problem, method, deployment, and measurable result.', 'AI projects resume', ['AI resume', 'machine learning projects']],
  ['Product Manager Resume Metrics Recruiters Want', 'Product & Business', 'Replace vague ownership statements with product outcomes, customer evidence, and business metrics.', 'product manager resume metrics', ['PM resume', 'product management CV']],
  ['Project Manager Resume: How to Show Delivery Impact', 'Product & Business', 'Make budgets, timelines, risks, and stakeholder wins easy to scan in seconds.', 'project manager resume impact', ['project management CV', 'PMP resume']],
  ['Business Analyst Resume Skills That Matter in 2026', 'Product & Business', 'Connect requirements, analysis, and process improvements to measurable results.', 'business analyst resume skills', ['business analyst CV', 'requirements analysis']],
  ['How to Build an Operations Manager Resume', 'Product & Business', 'Present operational scale, team leadership, cost control, and continuous improvement clearly.', 'operations manager resume', ['operations CV', 'leadership resume']],
  ['UX Designer Resume and Portfolio Checklist', 'Design & Creative', 'Create a focused resume that supports your portfolio instead of repeating every case study.', 'UX designer resume checklist', ['UX CV', 'design portfolio']],
  ['UI Designer Resume: Tools, Results, and Case Studies', 'Design & Creative', 'Show design-system thinking and product outcomes without turning your resume into a mood board.', 'UI designer resume', ['UI CV', 'Figma resume']],
  ['Graphic Designer Resume for Agency and In-House Roles', 'Design & Creative', 'Adjust your creative resume for the way agencies and internal teams evaluate designers.', 'graphic designer resume', ['graphic design CV', 'creative resume']],
  ['How to Write an Art Director Resume', 'Design & Creative', 'Frame creative leadership through campaign performance, team direction, and brand consistency.', 'art director resume writing', ['art director CV', 'creative leadership']],
  ['SEO Specialist Resume: Prove Organic Growth', 'Marketing & Media', 'Use rankings, qualified traffic, conversion, and technical wins to make SEO impact concrete.', 'SEO specialist resume', ['SEO CV', 'digital marketing resume']],
  ['Digital Marketing Resume Metrics to Include', 'Marketing & Media', 'Choose the campaign metrics that show commercial judgment rather than vanity numbers.', 'digital marketing resume metrics', ['marketing CV', 'campaign metrics']],
  ['Content Writer Resume Guide for 2026', 'Marketing & Media', 'Show editorial judgment, search performance, and audience growth in a compact writing resume.', 'content writer resume guide', ['content writing CV', 'copywriter resume']],
  ['Social Media Manager Resume That Shows Business Value', 'Marketing & Media', 'Turn posts and channels into a story about reach, engagement, leads, and community trust.', 'social media manager resume', ['social media CV', 'community manager']],
  ['Brand Manager Resume: Positioning Your Experience', 'Marketing & Media', 'Build a brand resume around customer insight, launches, and commercial performance.', 'brand manager resume', ['brand marketing CV', 'consumer marketing']],
  ['Sales Resume Metrics Beyond Quota Attainment', 'Sales & Customer Success', 'Show pipeline quality, deal complexity, retention, and the habits behind repeatable wins.', 'sales resume metrics', ['sales CV', 'account executive resume']],
  ['Account Executive Resume for a Competitive Market', 'Sales & Customer Success', 'A practical structure for communicating territory, pipeline, and closed-won impact.', 'account executive resume', ['AE resume', 'B2B sales CV']],
  ['Customer Success Manager Resume Guide', 'Sales & Customer Success', 'Show how your work protected revenue, improved adoption, and built customer trust.', 'customer success manager resume', ['CSM CV', 'customer retention']],
  ['Recruiter Resume: How to Quantify Hiring Impact', 'People & Administration', 'Make sourcing, candidate experience, and time-to-hire outcomes visible.', 'recruiter resume impact', ['recruiter CV', 'talent acquisition']],
  ['HR Manager Resume Skills and Examples', 'People & Administration', 'Organize people operations, policy, culture, and compliance achievements for senior roles.', 'HR manager resume skills', ['HR CV', 'human resources resume']],
  ['Executive Assistant Resume That Demonstrates Trust', 'People & Administration', 'Show judgment, prioritization, communication, and business rhythm without using generic phrases.', 'executive assistant resume', ['EA CV', 'administrative resume']],
  ['Accountant Resume Format and Achievement Examples', 'Finance & Legal', 'Present accuracy, controls, reporting, and close-cycle improvements in a credible format.', 'accountant resume format', ['accounting CV', 'finance resume']],
  ['Financial Analyst Resume: Modeling and Forecasting', 'Finance & Legal', 'Highlight decisions improved by your analysis, not just the spreadsheets you used.', 'financial analyst resume', ['financial analyst CV', 'FP&A resume']],
  ['Investment Banking Resume Guide', 'Finance & Legal', 'Use a dense, formal structure to show transactions, valuation work, and client exposure.', 'investment banking resume guide', ['IB resume', 'finance CV']],
  ['Lawyer Resume Writing: Experience and Matters', 'Finance & Legal', 'Make legal experience scannable while preserving the detail that signals judgment and expertise.', 'lawyer resume writing', ['legal CV', 'attorney resume']],
  ['Civil Engineer Resume for Project-Based Roles', 'Engineering & Manufacturing', 'Connect technical design, safety, cost, and site delivery in every major experience entry.', 'civil engineer resume', ['civil engineering CV', 'construction resume']],
  ['Mechanical Engineer Resume Skills and Project Examples', 'Engineering & Manufacturing', 'Show design decisions, testing, manufacturing constraints, and reliability improvements.', 'mechanical engineer resume', ['mechanical engineering CV', 'CAD resume']],
  ['Electrical Engineer Resume for Controls and Power', 'Engineering & Manufacturing', 'Make systems knowledge easy to find while keeping the document readable for non-specialists.', 'electrical engineer resume', ['electrical engineering CV', 'controls engineer']],
  ['Chemical Engineer Resume: Process Safety and Scale-Up', 'Engineering & Manufacturing', 'Present process improvements with safety, yield, throughput, and quality evidence.', 'chemical engineer resume', ['chemical engineering CV', 'process engineering']],
  ['Textile Engineer Resume for Manufacturing and Quality', 'Engineering & Manufacturing', 'Show fabric development, production quality, sustainability, and supplier collaboration.', 'textile engineer resume', ['textile CV', 'fashion manufacturing']],
  ['Automotive Engineer Resume: Validation and Manufacturing', 'Engineering & Manufacturing', 'Translate vehicle programs into clear evidence of testing, design, cost, and launch readiness.', 'automotive engineer resume', ['automotive CV', 'vehicle engineering']],
  ['Industrial Engineer Resume for Lean and Six Sigma', 'Engineering & Manufacturing', 'Quantify cycle-time, waste, capacity, and quality improvements with a practical structure.', 'industrial engineer resume', ['industrial engineering CV', 'Lean resume']],
  ['Quality Engineer Resume for Regulated Industries', 'Engineering & Manufacturing', 'Show root-cause analysis, corrective action, audits, and prevention in recruiter-friendly language.', 'quality engineer resume', ['quality engineering CV', 'ISO resume']],
  ['Doctor CV and Resume Structure for Clinical Roles', 'Healthcare', 'Organize credentials, clinical experience, research, and patient outcomes with confidence.', 'doctor CV structure', ['medical CV', 'physician resume']],
  ['Registered Nurse Resume: Clinical Impact Examples', 'Healthcare', 'Turn patient care into evidence of safety, teamwork, acuity, and outcomes.', 'registered nurse resume', ['nursing CV', 'RN resume']],
  ['Pharmacist Resume Skills and Achievement Statements', 'Healthcare', 'Present medication safety, counseling, compliance, and clinical collaboration clearly.', 'pharmacist resume skills', ['pharmacy CV', 'pharmacist resume']],
  ['Teacher Resume for Primary and Secondary Education', 'Education', 'Show learning outcomes, classroom leadership, and inclusive practice in a focused format.', 'teacher resume guide', ['teaching CV', 'education resume']],
  ['University Professor CV: Research and Teaching', 'Education', 'Build an academic CV that makes scholarship, teaching, grants, and service easy to navigate.', 'university professor CV', ['academic CV', 'professor resume']],
  ['Instructional Designer Resume for Learning Teams', 'Education', 'Connect learning design choices to adoption, completion, and performance outcomes.', 'instructional designer resume', ['L&D CV', 'e-learning resume']],
  ['Journalist Resume for Digital Newsrooms', 'Media & Communications', 'Show reporting range, verification, publishing speed, and audience trust.', 'journalist resume', ['journalism CV', 'reporter resume']],
  ['Public Relations Resume for Communications Leaders', 'Media & Communications', 'Present media relationships, reputation work, and campaign results in a structured story.', 'public relations resume', ['PR CV', 'communications resume']],
  ['Chef Resume for Hotels, Restaurants, and Catering', 'Hospitality & Service', 'Show menu development, service standards, food safety, and team leadership.', 'chef resume guide', ['culinary CV', 'chef resume']],
  ['Hotel Manager Resume That Shows Guest Experience', 'Hospitality & Service', 'Make occupancy, revenue, service, and team results immediately visible.', 'hotel manager resume', ['hospitality CV', 'hotel operations']],
  ['Supply Chain Manager Resume: Cost and Service Metrics', 'Logistics & Supply Chain', 'Balance procurement savings, inventory health, delivery performance, and supplier relationships.', 'supply chain manager resume', ['supply chain CV', 'procurement resume']],
  ['Warehouse Manager Resume for Modern Distribution', 'Logistics & Supply Chain', 'Show safety, throughput, inventory accuracy, and people leadership with numbers.', 'warehouse manager resume', ['warehouse CV', 'distribution manager']],
  ['Public Policy Analyst Resume Guide', 'Public Service', 'Connect research, stakeholder work, and policy recommendations to public outcomes.', 'public policy analyst resume', ['policy CV', 'government resume']],
  ['Nonprofit Program Manager Resume Examples', 'Public Service', 'Tell a compelling impact story through programs, funding, partnerships, and community outcomes.', 'nonprofit program manager resume', ['nonprofit CV', 'program management']],
  ['Career Change Resume: Transferable Skills Strategy', 'Career Advice', 'Reframe past work around capabilities that transfer into the role you want next.', 'career change resume strategy', ['career change CV', 'transferable skills']],
  ['How to Explain an Employment Gap on Your Resume', 'Career Advice', 'Use honest, calm language that keeps attention on your readiness and relevant experience.', 'employment gap resume', ['resume gap', 'job search']],
  ['Resume Summary vs Objective: Which Should You Use?', 'Writing Tips', 'Choose the opening section that gives a recruiter the clearest reason to keep reading.', 'resume summary vs objective', ['resume summary', 'career objective']],
];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

export const blogArticles: BlogArticle[] = topics.map(([title, category, excerpt, keyword, keywords], index) => {
  const date = `${monthNames[index % monthNames.length]} ${28 - (index % 20)}, 2026`;
  return {
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title,
    excerpt,
    category,
    date,
    author: 'Resume.Club Career Team',
    readTime: `${5 + (index % 7)} min`,
    keywords: [keyword, ...keywords],
    body: [
      `${title} is easier to improve when every section answers the same question: what evidence shows you can do this work well? Start with the requirements in the target job description, then select the strongest examples from your experience.`,
      `Use the exact language a recruiter and an applicant tracking system expect to see, but keep every keyword connected to a real result. A strong ${keyword} includes clear role context, the action you took, and the measurable change that followed.`,
      `For each experience entry, lead with an outcome, add the method or scope, and finish with a number wherever possible. This makes the document faster to scan while giving an interviewer useful prompts for a deeper conversation.`,
      `Before applying, remove repeated phrases, check dates and job titles, and export a clean PDF. Read the final version once as a recruiter: the most relevant evidence should be visible in the top third of the page.`,
    ],
  };
});

export const blogBySlug = Object.fromEntries(blogArticles.map((article) => [article.slug, article])) as Record<string, BlogArticle>;
