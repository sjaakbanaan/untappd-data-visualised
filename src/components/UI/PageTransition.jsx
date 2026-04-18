import { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Wraps page content and plays a fade-in-up animation
 * on every route change, matching the SectionTransition effect.
 */
const PageTransition = ({ children }) => {
  const containerRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    // Slide up — quick
    gsap.fromTo(
      el,
      { y: 40 },
      {
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'transform',
      }
    );

    // Fade in — longer, softer
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
      }
    );
  }, [location.pathname]);

  return <div ref={containerRef}>{children}</div>;
};

export default PageTransition;
