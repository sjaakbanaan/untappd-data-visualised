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

    // Slide up — quick
    if (!skipMove) {
      gsap.fromTo(
        targets,
        { y: 40 },
        {
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'transform',
        }
      );
    }
    // Fade in — longer, softer
    gsap.fromTo(
      targets,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.4,
        delay: 0.2,
        ease: 'power2.out',
        stagger: 0.08,
      }
    );
  }, [sectionKey, skipMove]);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
};

export default SectionTransition;
