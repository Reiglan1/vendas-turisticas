import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'fade-in' | 'scale-in';
  delay?: '100' | '200' | '300' | '400' | '500';
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function ScrollReveal({
  children,
  animation = 'fade-in-up',
  delay,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  const animationClasses = [
    'animate-on-scroll',
    animation,
    isVisible && 'is-visible',
    delay && `delay-${delay}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={animationClasses}>
      {children}
    </div>
  );
}

