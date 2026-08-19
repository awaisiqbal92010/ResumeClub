import { type ReactNode } from 'react';
import { useScrollReveal } from '@/lib/animations';

interface RevealProps {
  children: ReactNode;
  variant?: 'up' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  className?: string;
}

export default function Reveal({ children, variant = 'up', delay = 0, className = '' }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const variantClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
    rotate: 'reveal-rotate',
  }[variant];

  return (
    <div
      ref={ref}
      className={`${variantClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
