import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const setupScrollReveal = (element, index, componentIndex) => {
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
        delay: isInViewport ? index * 0.1 : 0,
        ease: 'power2.out',
        visibility: 'visible',
      });
    },
    once: true,
  });

  return () => {
    st.kill();
    if (index === componentIndex - 1) {
      componentIndex = 0;
    }
  };
};
