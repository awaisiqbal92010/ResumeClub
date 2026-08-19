import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowUpRight } from 'lucide-react';
import { useScrollProgress } from '@/lib/animations';

const navLinks = [
  { to: '/templates', label: 'Templates' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/blog', label: 'Blog' },
  { to: '/career-resources', label: 'Resources' },
  { to: '/interview-tips', label: 'Interview' },
  { to: '/support', label: 'Support' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-3"
    >
      <motion.nav
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`mx-auto max-w-7xl flex items-center justify-between h-16 px-2 sm:px-3 rounded-[30px] transition-all duration-500 ${
          scrolled
            ? 'glass shadow-float border-2 border-white/90'
            : 'bg-white/65 backdrop-blur-md border-2 border-white/80 shadow-soft'
        }`}
      >
        <Link to="/" className="flex items-center pl-2 group min-w-0">
          <motion.img
            src="/Gemini_Generated_Image_2z1yxr2z1yxr2z1y-removebg-preview.png"
            alt="Resume.Club"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="h-9 sm:h-10 w-auto max-w-[156px] sm:max-w-[190px] object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-ink-100/70 border border-white/70">
          {navLinks.map((link) => {
            const active = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-3.5 py-2 rounded-full text-[13px] font-semibold text-ink-600 hover:text-ink-950 transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-1.5 pr-1">
          <Link to="/login" className="btn-ghost text-[13px]">Log in</Link>
          <Link to="/builder" className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-ink-900/15 transition-all hover:-translate-y-0.5 hover:bg-brand-700">
            <Sparkles className="w-3.5 h-3.5 text-accent-300" />
            Build my resume
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden mr-2 p-2.5 rounded-full bg-ink-100/80 text-ink-800"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </motion.nav>

      <div className="mx-auto max-w-7xl h-0.5 mt-1 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 via-accent-400 to-brand-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="md:hidden mx-auto max-w-7xl mt-2 p-2 rounded-[22px] glass shadow-float border border-white/80"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                  <Link
                    to={link.to}
                    className={`block rounded-full px-4 py-3 text-sm font-semibold transition-colors ${location.pathname.startsWith(link.to) ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-100'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-2 mt-1 pt-2 border-t border-ink-200/70">
                <Link to="/login" className="btn-secondary flex-1">Log in</Link>
                <Link to="/builder" className="btn-primary flex-1"><Sparkles className="w-4 h-4" /> Start building</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
