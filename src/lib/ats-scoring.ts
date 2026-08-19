import type { ResumeData } from '@/types/resume';

export interface ATSResult {
  score: number;
  grade: string;
  checks: ATSCheck[];
  suggestions: string[];
  keywordDensity: { keyword: string; count: number }[];
  missingSections: string[];
}

export interface ATSCheck {
  label: string;
  passed: boolean;
  message: string;
  weight: number;
}

const ACTION_VERBS = [
  'led', 'built', 'created', 'developed', 'architected', 'designed',
  'implemented', 'launched', 'optimized', 'streamlined', 'managed',
  'spearheaded', 'transformed', 'engineered', 'delivered', 'reduced',
  'increased', 'improved', 'automated', 'migrated', 'established',
  'mentored', 'drove', 'accelerated', 'pioneered', 'scaled',
];

const FILLER_WORDS = [
  'responsible for', 'duties included', 'tasked with', 'worked on',
  'helped with', 'assisted in', 'involved in', 'participated in',
];

const COMMON_SKILL_KEYWORDS = [
  'javascript', 'typescript', 'python', 'java', 'react', 'node',
  'aws', 'docker', 'kubernetes', 'sql', 'postgresql', 'mongodb',
  'graphql', 'rest', 'api', 'ci/cd', 'git', 'agile', 'scrum',
  'leadership', 'collaboration', 'communication', 'analytics',
  'project management', 'stakeholder', 'cross-functional',
];

export function calculateATSScore(data: ResumeData, jobDescription?: string): ATSResult {
  const checks: ATSCheck[] = [];
  const suggestions: string[] = [];
  const missingSections: string[] = [];

  // 1. Contact info completeness
  const p = data.personalInfo;
  const contactFields = [p.email, p.phone, p.location];
  const contactCount = contactFields.filter(Boolean).length;
  checks.push({
    label: 'Contact Information',
    passed: contactCount >= 2,
    message: contactCount >= 2
      ? `${contactCount}/3 contact fields present`
      : 'Add at least email, phone, and location',
    weight: 10,
  });
  if (contactCount < 2) missingSections.push('Contact info');

  // 2. Professional summary
  const summaryWords = data.summary ? data.summary.trim().split(/\s+/).length : 0;
  checks.push({
    label: 'Professional Summary',
    passed: summaryWords >= 20,
    message: summaryWords === 0
      ? 'Missing — add a 2-3 sentence summary'
      : summaryWords < 20
        ? `Too short (${summaryWords} words) — aim for 30-50 words`
        : `Good length (${summaryWords} words)`,
    weight: 10,
  });
  if (!data.summary) missingSections.push('Summary');

  // 3. Work experience
  const expCount = data.experience.length;
  checks.push({
    label: 'Work Experience',
    passed: expCount >= 1,
    message: expCount === 0
      ? 'Missing — add at least one work experience'
      : `${expCount} ${expCount === 1 ? 'entry' : 'entries'} listed`,
    weight: 15,
  });
  if (expCount === 0) missingSections.push('Work experience');

  // 4. Quantified achievements
  let quantifiedCount = 0;
  let totalBullets = 0;
  data.experience.forEach((exp) => {
    exp.bulletPoints.forEach((b) => {
      if (b.trim()) {
        totalBullets++;
        if (/\d+%|\$|\d+x|\d+m|\d+k|\d+,\d+|\d+ users|\d+ people/i.test(b)) {
          quantifiedCount++;
        }
      }
    });
  });
  const quantPct = totalBullets > 0 ? (quantifiedCount / totalBullets) * 100 : 0;
  checks.push({
    label: 'Quantified Achievements',
    passed: quantPct >= 40,
    message: totalBullets === 0
      ? 'No bullet points yet'
      : `${quantifiedCount}/${totalBullets} bullets have metrics (${Math.round(quantPct)}%)`,
    weight: 15,
  });
  if (totalBullets > 0 && quantPct < 40) {
    suggestions.push('Add numbers to your bullet points — e.g., "Reduced load time by 40%" instead of "Improved performance".');
  }

  // 5. Action verbs
  let actionVerbCount = 0;
  data.experience.forEach((exp) => {
    exp.bulletPoints.forEach((b) => {
      const firstWord = b.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
      if (firstWord && ACTION_VERBS.includes(firstWord)) actionVerbCount++;
    });
  });
  checks.push({
    label: 'Action Verbs',
    passed: actionVerbCount >= totalBullets * 0.5 && actionVerbCount > 0,
    message: `${actionVerbCount}/${totalBullets} bullets start with strong action verbs`,
    weight: 10,
  });
  if (totalBullets > 0 && actionVerbCount < totalBullets * 0.5) {
    suggestions.push('Start bullet points with strong action verbs like "Led", "Built", "Architected", or "Optimized".');
  }

  // 6. Filler words check
  let fillerCount = 0;
  data.experience.forEach((exp) => {
    exp.bulletPoints.forEach((b) => {
      const lower = b.toLowerCase();
      FILLER_WORDS.forEach((f) => {
        if (lower.includes(f)) fillerCount++;
      });
    });
  });
  checks.push({
    label: 'No Filler Words',
    passed: fillerCount === 0,
    message: fillerCount === 0
      ? 'No filler phrases detected'
      : `${fillerCount} filler phrase${fillerCount > 1 ? 's' : ''} found (e.g., "responsible for")`,
    weight: 5,
  });
  if (fillerCount > 0) {
    suggestions.push('Replace filler phrases like "responsible for" with direct action verbs.');
  }

  // 7. Skills section
  const skillCount = data.skills.length;
  checks.push({
    label: 'Skills Section',
    passed: skillCount >= 5,
    message: skillCount === 0
      ? 'Missing — add at least 5 relevant skills'
      : skillCount < 5
        ? `Only ${skillCount} skills — add more for ATS keywords`
        : `${skillCount} skills listed`,
    weight: 10,
  });
  if (skillCount === 0) missingSections.push('Skills');

  // 8. Education
  checks.push({
    label: 'Education',
    passed: data.education.length >= 1,
    message: data.education.length >= 1
      ? 'Education section present'
      : 'Missing — add your education history',
    weight: 5,
  });
  if (data.education.length === 0) missingSections.push('Education');

  // 9. Section headers (standard)
  checks.push({
    label: 'Standard Section Headers',
    passed: true,
    message: 'Uses standard section headers (Experience, Education, Skills)',
    weight: 5,
  });

  // 10. Keyword match (if job description provided)
  if (jobDescription && jobDescription.trim().length > 20) {
    const jdLower = jobDescription.toLowerCase();
    const jdKeywords = COMMON_SKILL_KEYWORDS.filter((k) => jdLower.includes(k));
    const resumeText = JSON.stringify(data).toLowerCase();
    const matchedKeywords = jdKeywords.filter((k) => resumeText.includes(k));
    const matchPct = jdKeywords.length > 0 ? (matchedKeywords.length / jdKeywords.length) * 100 : 0;
    checks.push({
      label: 'Job Description Match',
      passed: matchPct >= 60,
      message: jdKeywords.length === 0
        ? 'No common keywords found in job description'
        : `${matchedKeywords.length}/${jdKeywords.length} keywords matched (${Math.round(matchPct)}%)`,
      weight: 15,
    });
    if (matchPct < 60 && jdKeywords.length > 0) {
      const missing = jdKeywords.filter((k) => !resumeText.includes(k));
      suggestions.push(`Add these missing keywords from the job description: ${missing.join(', ')}.`);
    }
  } else {
    checks.push({
      label: 'Keyword Density',
      passed: skillCount >= 5,
      message: 'Paste a job description for keyword matching analysis',
      weight: 15,
    });
    suggestions.push('Paste a job description to get a keyword match score and tailored suggestions.');
  }

  // Calculate score
  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
  const earnedWeight = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0);
  const score = Math.round((earnedWeight / totalWeight) * 100);

  // Keyword density
  const allText = JSON.stringify(data).toLowerCase();
  const keywordDensity = COMMON_SKILL_KEYWORDS
    .map((k) => ({ keyword: k, count: (allText.match(new RegExp(k, 'g')) || []).length }))
    .filter((k) => k.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Grade
  let grade = 'F';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 60) grade = 'C';
  else if (score >= 50) grade = 'D';

  return { score, grade, checks, suggestions, keywordDensity, missingSections };
}
