import { useEffect, useRef } from 'react';

export const useAutoScroll = () => {
  const targetRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('autoscroll') !== '1') {
      return undefined;
    }

    const requestedSpeed = Number(params.get('scrollSpeed'));
    const pixelsPerSecond = requestedSpeed > 0 ? requestedSpeed : 90;
    const startDelay = 1500;
    let animationFrame;
    let startTime;
    let startPosition;

    const startTimer = window.setTimeout(() => {
      startPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: startPosition, behavior: 'auto' });

      const scroll = (time) => {
        startTime ??= time;

        const endPosition =
          targetRef.current.getBoundingClientRect().bottom +
          window.scrollY -
          window.innerHeight;
        const nextPosition = Math.min(
          startPosition + ((time - startTime) / 1000) * pixelsPerSecond,
          endPosition
        );

        window.scrollTo({ top: nextPosition, behavior: 'auto' });

        if (nextPosition < endPosition) {
          animationFrame = requestAnimationFrame(scroll);
        }
      };

      animationFrame = requestAnimationFrame(scroll);
    }, startDelay);

    const stopAutoScroll = ({ key } = {}) => {
      if (key && key !== 'Escape') {
        return;
      }

      window.clearTimeout(startTimer);
      cancelAnimationFrame(animationFrame);
    };

    window.addEventListener('keydown', stopAutoScroll);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('keydown', stopAutoScroll);
    };
  }, []);

  return targetRef;
};
