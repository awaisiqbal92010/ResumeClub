export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bulletPoints: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export interface Resume {
  id: string;
  title: string;
  template: string;
  accent_color: string;
  data: ResumeData;
  created_at: string;
  updated_at: string;
}

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Morgan',
    professionalTitle: 'Senior Software Engineer',
    email: 'alex.morgan@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
  },
  summary:
    'Senior Software Engineer with 8+ years building scalable web applications. Specialized in React, TypeScript, and cloud architecture. Led teams of 5+ engineers and shipped products used by millions.',
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      bulletPoints: [
        'Architected a microservices system serving 2M daily users with 99.9% uptime.',
        'Led migration to React, reducing page load time by 40% and improving Lighthouse scores from 62 to 95.',
        'Mentored 4 junior engineers and established code review best practices across the team.',
      ],
    },
    {
      id: 'exp2',
      jobTitle: 'Software Engineer',
      company: 'Stripe',
      location: 'Remote',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      bulletPoints: [
        'Built payment processing features handling $50M+ in monthly transactions.',
        'Reduced API response time by 60% through query optimization and caching.',
        'Collaborated with product to ship 12 major features in a single quarter.',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'B.S. Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2014',
      endDate: '2018',
      details: 'GPA: 3.8, Dean\'s List, ACM Programming Club President',
    },
  ],
  skills: [
    { id: 's1', name: 'TypeScript', level: 'Expert' },
    { id: 's2', name: 'React', level: 'Expert' },
    { id: 's3', name: 'Node.js', level: 'Advanced' },
    { id: 's4', name: 'Python', level: 'Advanced' },
    { id: 's5', name: 'AWS', level: 'Intermediate' },
    { id: 's6', name: 'PostgreSQL', level: 'Advanced' },
    { id: 's7', name: 'GraphQL', level: 'Intermediate' },
    { id: 's8', name: 'Docker', level: 'Advanced' },
  ],
  projects: [
    {
      id: 'p1',
      name: 'OpenMetrics',
      description: 'Open-source analytics dashboard with real-time charts and custom alerts.',
      techStack: ['React', 'D3.js', 'WebSocket', 'Go'],
      link: 'github.com/alexmorgan/openmetrics',
    },
  ],
  certifications: [
    {
      id: 'c1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022',
    },
  ],
};

export const templateOptions = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column with a tinted sidebar',
    category: 'Popular',
    accent: '#4F46E5',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Single column, generous whitespace, thin rules',
    category: 'Popular',
    accent: '#0F172A',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Serif headings, formal, centered header',
    category: 'Professional',
    accent: '#1E293B',
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Skills-forward, tag-style chips',
    category: 'Engineer',
    accent: '#06B6D4',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold & colorful, accent line header',
    category: 'Design',
    accent: '#EC4899',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense layout, no graphics, max keyword density',
    category: 'ATS',
    accent: '#059669',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Centered serif header, strong hierarchy, boardroom-ready',
    category: 'ATS',
    accent: '#1E3A5F',
  },
  {
    id: 'harvard',
    name: 'Harvard',
    description: 'Clean single-column with margin rule, admissions standard',
    category: 'ATS',
    accent: '#7C2D12',
  },
  {
    id: 'stanford',
    name: 'Stanford',
    description: 'Two-column with section rules, academic-friendly',
    category: 'ATS',
    accent: '#8C1515',
  },
  {
    id: 'atsexpert',
    name: 'ATS Expert',
    description: 'Pure-text layout, maximum parseability, zero graphics',
    category: 'ATS',
    accent: '#0F172A',
  },
] as const;
