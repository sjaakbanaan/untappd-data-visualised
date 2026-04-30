import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

/**
 * Wraps section content and plays a fade-in-up animation
 * every time the `sectionKey` prop changes.
 */
const BadgeTransition = ({ sectionKey, children }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || !el.children.length) return;

    const targets = [...el.children];

    // Set initial state immediately
    gsap.set(targets, { y: 40, opacity: 0 });

    // Slide up — quick
    gsap.to(targets, {
      y: 0,
      duration: 1, // Reset to a reasonable value, user can tweak
      ease: 'power3.out',
      stagger: 0.02,
      clearProps: 'transform',
    });

    // Fade in — longer, softer
    gsap.to(targets, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.04,
    });
  }, [sectionKey]);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
};

export default BadgeTransition;
