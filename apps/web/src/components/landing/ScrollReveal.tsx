'use client';

import React, { useEffect, useRef, useState, CSSProperties, ReactNode } from 'react';

/**
 * Animation variants for scroll-triggered reveals.
 * Each variant defines the initial hidden state — the element animates
 * FROM these values TO normal (opacity:1, transform:none) when in view.
 */
type AnimationVariant =
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
  /** Duration of the animation in ms. Default: 700 */
  duration?: number;
  /** IntersectionObserver threshold (0-1). Default: 0.15 */
  threshold?: number;
  /** Extra CSS easing. Default: 'cubic-bezier(0.16, 1, 0.3, 1)' (expo-out) */
  easing?: string;
  /** If true, the animation replays every time the element re-enters viewport. Default: false */
  replay?: boolean;
  /** Additional inline styles on the wrapper */
  style?: CSSProperties;
  /** Additional className */
  className?: string;
  /** Wrapper element type. Default: 'div' */
  as?: keyof JSX.IntrinsicElements;
}

// Map of variant → initial CSS transform + opacity
const VARIANT_STYLES: Record<AnimationVariant, CSSProperties> = {
  'fade-up':         { opacity: 0, transform: 'translateY(50px)' },
  'fade-down':       { opacity: 0, transform: 'translateY(-50px)' },
  'fade-left':       { opacity: 0, transform: 'translateX(-60px)' },
  'fade-right':      { opacity: 0, transform: 'translateX(60px)' },
  'zoom-in':         { opacity: 0, transform: 'scale(0.88)' },
  'zoom-out':        { opacity: 0, transform: 'scale(1.12)' },
  'flip-up':         { opacity: 0, transform: 'perspective(800px) rotateX(12deg) translateY(40px)' },
  'blur-in':         { opacity: 0, filter: 'blur(12px)', transform: 'translateY(20px)' },
  'slide-up-spring': { opacity: 0, transform: 'translateY(70px) scale(0.96)' },
  'scale-rotate':    { opacity: 0, transform: 'scale(0.85) rotate(-3deg)' },
};

// Revealed (visible) state for all variants
const REVEALED_BASE: CSSProperties = {
  opacity: 1,
  transform: 'none',
  filter: 'none',
};

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  replay = false,
  style,
  className,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

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
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [threshold, replay]);

  const hiddenStyles = VARIANT_STYLES[variant] || VARIANT_STYLES['fade-up'];

  const computedStyle: CSSProperties = {
    ...style,
    willChange: 'opacity, transform, filter',
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
    transitionDelay: `${delay}ms`,
    ...(isVisible ? REVEALED_BASE : hiddenStyles),
  };

  // Use createElement to support dynamic tag
  return React.createElement(
    Tag as string,
    {
      ref,
      style: computedStyle,
      className,
    },
    children
  );
}

/**
 * Stagger wrapper — applies incrementing delays to each child ScrollReveal.
 * Usage:
 * <StaggerReveal stagger={100}>
 *   <ScrollReveal><Card1 /></ScrollReveal>
 *   <ScrollReveal><Card2 /></ScrollReveal>
 * </StaggerReveal>
 *
 * Each child's delay = index * stagger
 */
interface StaggerRevealProps {
  children: ReactNode;
  /** Base delay increment in ms between each child. Default: 80 */
  stagger?: number;
  style?: CSSProperties;
  className?: string;
}

export function StaggerReveal({
  children,
  stagger = 80,
  style,
  className,
}: StaggerRevealProps) {
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
