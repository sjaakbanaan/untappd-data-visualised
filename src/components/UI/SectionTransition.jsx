import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

/**
 * Wraps section content and plays a fade-in-up animation
 * every time the `sectionKey` prop changes.
 */
const SectionTransition = ({ sectionKey, children, skipMove }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || !el.children.length) return;

    const targets = [...el.children];

    // Kill any running tweens so rapid switches stay snappy
    gsap.killTweensOf(targets);

    // Set initial state immediately
    gsap.set(targets, { opacity: 0 });
    if (!skipMove) {
      gsap.set(targets, { y: 40 });
    }

    // Slide up — quick
    if (!skipMove) {
      gsap.to(targets, {
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        clearProps: 'transform',
      });
    }

    // Fade in — longer, softer
    gsap.to(targets, {
      opacity: 1,
      duration: 1.4,
      delay: 0.1,
      ease: 'power2.out',
      stagger: 0.08,
    });
  }, [sectionKey, skipMove]);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
};

export default SectionTransition;
