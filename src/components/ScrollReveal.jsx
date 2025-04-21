import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let componentIndex = 0;

const ScrollReveal = ({ children }) => {
  const elementRef = useRef(null);
  const currentIndex = useRef(componentIndex++);

  useEffect(() => {
    const element = elementRef.current;
    const isInViewport = ScrollTrigger.isInViewport(element);

    gsap.set(element, {
      y: 100,
      opacity: 0,
      visibility: 'hidden',
    });

    const st = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom-=60',
      onEnter: () => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: isInViewport ? currentIndex.current * 0.1 : 0,
          ease: 'power2.out',
          visibility: 'visible',
        });
      },
      once: true,
    });

    return () => {
      st.kill();
      if (currentIndex.current === componentIndex - 1) {
        componentIndex = 0;
      }
    };
  }, []);

  return (
    <div ref={elementRef} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollReveal;
