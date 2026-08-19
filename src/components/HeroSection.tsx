import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles, ArrowRight, Star, Users, ShieldCheck, Zap,
  Download, Palette, FileText, Check,
} from 'lucide-react';
import ResumePreview from '@/components/ResumePreview';
import { sampleResumeData, templateOptions } from '@/types/resume';

const TYPING_WORDS = ['better resume', 'ATS-friendly CV', 'standout portfolio', 'winning profile'];

const spring = { type: 'spring' as const, stiffness: 160, damping: 20 };

const headlineWords = ['Your', 'next', 'job', 'starts', 'with', 'a'];

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { scrollY } = useScroll();
  const previewY = useTransform(scrollY, [0, 700], [0, 110]);
  const previewRotate = useTransform(scrollY, [0, 700], [0, -3]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), { stiffness: 240, damping: 24 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), { stiffness: 240, damping: 24 });
  const cardScale = useSpring(1, { stiffness: 240, damping: 20 });

  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const next = word.substring(0, typedText.length + 1);
        setTypedText(next);
        if (next === word) window.setTimeout(() => setIsDeleting(true), 1500);
      } else {
        const next = word.substring(0, typedText.length - 1);
        setTypedText(next);
        if (!next) {
          setIsDeleting(false);
          setWordIdx((current) => (current + 1) % TYPING_WORDS.length);
        }
      }
    }, isDeleting ? 45 : 90);
    return () => window.clearTimeout(timeout);
  }, [typedText, isDeleting, wordIdx]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden gradient-mesh">
      <motion.div className="absolute inset-0 grid-pattern opacity-40" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1.2 }} />
      <motion.div className="absolute top-20 right-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" animate={{ x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.12, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-10 left-10 w-72 h-72 bg-accent-200/30 rounded-full blur-3xl" animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1.1, 1, 1.1] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />

      <FloatingIcon icon={<Zap className="w-6 h-6 text-amber-500" />} className="top-32 left-[8%]" delay={0} />
      <FloatingIcon icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />} className="top-48 right-[8%]" delay={0.8} />
      <FloatingIcon icon={<Download className="w-6 h-6 text-brand-500" />} className="bottom-40 left-[6%]" delay={1.5} />
      <FloatingIcon icon={<Palette className="w-6 h-6 text-rose-500" />} className="bottom-32 right-[10%]" delay={2.1} />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.2 }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.35 }} className="section-eyebrow mb-6">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Resume Builder
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-900 leading-[1.1] text-balance">
              <motion.span
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
                }}
                className="inline-block"
              >
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    }}
                    transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span layout className="gradient-text animate-gradient inline-block min-h-[1.2em]">
                {typedText}<span className="inline-block w-0.5 h-[0.9em] bg-brand-500 ml-0.5 animate-pulse align-middle" />
              </motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.5 }} className="mt-6 text-lg text-ink-600 leading-relaxed max-w-xl text-pretty">
              Create job-winning, ATS-friendly resumes and portfolios in minutes with AI. Edit every detail live, score with ATS, and download print-perfect PDFs.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="mt-8 flex flex-wrap gap-3">
              <Link to="/builder" className="btn-primary text-base px-6 py-3 group"><Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Get Started Free</Link>
              <Link to="/templates" className="btn-secondary text-base px-6 py-3 group">Browse Templates <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 flex flex-wrap items-center gap-5 text-sm text-ink-500">
              <div className="flex items-center gap-1.5"><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div><span className="font-medium">4.9/5 from 2,400+ reviews</span></div>
              <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-brand-500" /><span className="font-medium">50,000+ job seekers</span></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }} className="mt-6 flex flex-wrap gap-2">
              {['ATS Score', 'Live Preview', 'AI Writer', '11 Templates', 'PDF Export', 'Photo CV'].map((feature) => <span key={feature} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-ink-200/60 text-xs font-medium text-ink-600 shadow-sm"><Check className="w-3 h-3 text-emerald-500" />{feature}</span>)}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: previewY, rotate: previewRotate }} initial={{ opacity: 0, x: 35, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ ...spring, delay: 0.35 }} className="relative perspective-1000">
            <motion.div
              style={{ rotateX, rotateY, scale: cardScale, transformPerspective: 1200 }}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              whileHover={{ scale: 1.015 }}
              className="relative preserve-3d transition-shadow duration-300"
            >
              <motion.div animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.98, 1.03, 0.98] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -inset-5 bg-gradient-to-br from-brand-300/40 to-accent-300/40 rounded-3xl blur-2xl" />
              <div className="relative shadow-float rounded-2xl overflow-hidden border border-ink-200/50 bg-white">
                <div className="bg-ink-100 px-3 py-2 flex items-center gap-1.5 border-b border-ink-200"><div className="w-2.5 h-2.5 rounded-full bg-rose-400" /><div className="w-2.5 h-2.5 rounded-full bg-amber-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><span className="ml-2 text-xs text-ink-400 font-medium">resume-preview.pdf</span></div>
                <div className="max-h-[520px] overflow-hidden"><ResumePreview data={sampleResumeData} template="modern" accentColor="#4F46E5" /></div>
              </div>
              <FloatingBadge icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />} title="ATS Score: 95/100" subtitle="Excellent match" className="-bottom-4 -right-4" delay={0.6} />
              <FloatingBadge icon={<Sparkles className="w-5 h-5 text-brand-600" />} title="AI Generated" subtitle="In 1 click" className="-top-4 -left-4" delay={1.4} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 overflow-hidden">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }} className="flex gap-4 w-max">
          {[...templateOptions, ...templateOptions].map((template, index) => <motion.div key={`${template.id}-${index}`} whileHover={{ y: -12, rotateZ: index % 2 ? 2 : -2, scale: 1.04 }} className="shrink-0 w-40 h-56 rounded-xl border border-ink-200/60 bg-white shadow-sm overflow-hidden"><div className="h-full scale-[0.25] origin-top-left w-[400px]"><ResumePreview data={sampleResumeData} template={template.id} accentColor={template.accent} /></div></motion.div>)}
        </motion.div>
      </div>
    </section>
  );
}

function FloatingIcon({ icon, className, delay }: { icon: React.ReactNode; className: string; delay: number }) {
  return <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }} transition={{ opacity: { delay, duration: 0.4 }, scale: { delay, ...spring }, y: { delay: delay + 0.3, duration: 5, repeat: Infinity, ease: 'easeInOut' } }} className={`absolute hidden lg:block ${className}`}><div className="glass rounded-2xl p-3 shadow-soft">{icon}</div></motion.div>;
}

function FloatingBadge({ icon, title, subtitle, className, delay }: { icon: React.ReactNode; title: string; subtitle: string; className: string; delay: number }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: [0, -8, 0] }} transition={{ opacity: { delay, duration: 0.5 }, y: { delay: delay + 0.4, duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }} className={`absolute glass rounded-2xl px-4 py-3 shadow-float flex items-center gap-2.5 ${className}`}><div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">{icon}</div><div><p className="text-sm font-bold text-ink-900 whitespace-nowrap">{title}</p><p className="text-xs text-ink-500">{subtitle}</p></div></motion.div>;
}
