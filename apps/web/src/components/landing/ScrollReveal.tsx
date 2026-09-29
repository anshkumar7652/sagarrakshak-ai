'use client';

import React, { useEffect, useRef, useState, CSSProperties, ReactNode } from 'react';

export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-up'
  | 'blur-in'
  | 'slide-up-spring'
  | 'scale-rotate';

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation type. Default: 'fade-up' */
  variant?: AnimationVariant;
  /** Delay in ms before animation starts after triggering. Default: 0 */
  delay?: number;
  /** Duration of the animation in ms. Default: 650 */
  duration?: number;
  /** IntersectionObserver threshold (0-1). Default: 0.08 */
  threshold?: number;
  /** Extra CSS easing. Default: 'cubic-bezier(0.16, 1, 0.3, 1)' (smooth expo-out) */
  easing?: string;
  /** If true, the animation replays every time the element re-enters viewport. Default: false */
  replay?: boolean;
  /** Additional inline styles on the wrapper */
  style?: CSSProperties;
  /** Additional className */
  className?: string;
  /** Wrapper element type. Default: 'div' */
  as?: keyof React.JSX.IntrinsicElements;
}

// Initial hidden state for each variant
const VARIANT_INITIAL_STYLES: Record<AnimationVariant, CSSProperties> = {
  'fade-up':         { opacity: 0, transform: 'translateY(60px)' },
  'fade-down':       { opacity: 0, transform: 'translateY(-60px)' },
  'fade-left':       { opacity: 0, transform: 'translateX(-70px)' },
  'fade-right':      { opacity: 0, transform: 'translateX(70px)' },
  'zoom-in':         { opacity: 0, transform: 'scale(0.84)' },
  'zoom-out':        { opacity: 0, transform: 'scale(1.15)' },
  'flip-up':         { opacity: 0, transform: 'perspective(900px) rotateX(16deg) translateY(50px)' },
  'blur-in':         { opacity: 0, filter: 'blur(10px)', transform: 'translateY(30px)' },
  'slide-up-spring': { opacity: 0, transform: 'translateY(75px) scale(0.94)' },
  'scale-rotate':    { opacity: 0, transform: 'scale(0.85) rotate(-3.5deg)' },
};

// Visible revealed state
const VARIANT_REVEALED_STYLES: CSSProperties = {
  opacity: 1,
  transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
  filter: 'blur(0px)',
};

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 650,
  threshold = 0.08,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  replay = false,
  style,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Use IntersectionObserver with generous rootMargin so elements animate visibly as they appear
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!replay) {
            observer.unobserve(node);
          }
        } else if (replay) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [threshold, replay]);

  const initialStyles = VARIANT_INITIAL_STYLES[variant] || VARIANT_INITIAL_STYLES['fade-up'];

  const computedStyle: CSSProperties = {
    ...style,
    willChange: 'opacity, transform, filter',
    transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms, filter ${duration}ms ${easing} ${delay}ms`,
    ...(isVisible ? VARIANT_REVEALED_STYLES : initialStyles),
  };

  return React.createElement(
    Tag as string,
    {
      ref,
      style: computedStyle,
      className: `${className} scroll-reveal-node ${isVisible ? 'revealed' : 'hidden'}`,
    },
    children
  );
}

/**
 * Stagger Reveal Container for groups of cards or items
 */
export function StaggerReveal({
  children,
  stagger = 100,
  style,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const childArray = React.Children.toArray(children);

  return (
    <div style={style} className={className}>
      {childArray.map((child, index) => {
        if (React.isValidElement(child) && child.type === ScrollReveal) {
          return React.cloneElement(child as React.ReactElement<ScrollRevealProps>, {
            delay: (child.props as ScrollRevealProps).delay ?? index * stagger,
          });
        }
        return child;
      })}
    </div>
  );
}
