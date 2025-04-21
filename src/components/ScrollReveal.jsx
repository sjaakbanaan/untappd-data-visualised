import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ children }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    // Set initial state
    gsap.set(element, {
      y: 100,
      opacity: 0,
    });

    // First element should animate immediately
    if (element === element.parentElement.firstElementChild) {
      gsap.to(element, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    } else {
      // For other elements, use ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: element,
        start: 'top bottom-=100',
        end: 'top top',
        onEnter: () => {
          gsap.to(element, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(element, {
            y: 100,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
      });

      return () => st.kill();
    }
  }, []);

  return <div ref={elementRef}>{children}</div>;
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollReveal;
