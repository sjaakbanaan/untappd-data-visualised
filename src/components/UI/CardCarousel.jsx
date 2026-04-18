import { useEffect, useRef, useCallback, Children } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Icon from './Icon/Icon';

gsap.registerPlugin(Draggable);

/**
 * A reusable infinite-scrolling card carousel powered by GSAP.
 * Cards slide horizontally with seamless looping, drag/swipe support,
 * and prev/next navigation buttons.
 *
 * @param {string} cardSelector - CSS selector to find card elements inside the list
 * @param {ReactNode} children - Card elements to render inside the carousel
 * @param {number} spread - How far cards travel horizontally (default 400, lower = tighter)
 * @param {string} galleryClassName - Optional class overrides for the gallery container
 * @param {string} cardsClassName - Optional class overrides for the cards ul
 */
const CardCarousel = ({
  cardSelector,
  children,
  spread = 400,
  galleryClassName = 'h-[320px] md:h-[360px]',
  cardsClassName = 'h-52 w-60 md:h-60 md:w-72',
}) => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const animationRef = useRef(null);
  const dragProxyRef = useRef(null);

  const childCount = Children.count(children);

  const buildSeamlessLoop = useCallback((items, spacing, animateFunc) => {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;
    const rawSequence = gsap.timeline({ paused: true });
    const seamlessLoop = gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat() {
        // eslint-disable-next-line no-underscore-dangle -- GSAP internal workaround for seamless loop edge case
        if (this._time === this._dur) this._tTime += this._dur - 0.01;
      },
    });
    const l = items.length + overlap * 2;

    for (let i = 0; i < l; i++) {
      const index = i % items.length;
      const time = i * spacing;
      rawSequence.add(animateFunc(items[index]), time);
      if (i <= items.length) {
        seamlessLoop.add('label' + i, time);
      }
    }

    rawSequence.time(startTime);
    seamlessLoop
      .to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: 'none',
      })
      .fromTo(
        rawSequence,
        { time: overlap * spacing + 1 },
        {
          time: startTime,
          duration: startTime - (overlap * spacing + 1),
          immediateRender: false,
          ease: 'none',
        }
      );
    return seamlessLoop;
  }, []);

  useEffect(() => {
    if (childCount === 0 || !cardsRef.current) return;

    const cardElements = gsap.utils.toArray(
      cardsRef.current.querySelectorAll(cardSelector)
    );
    if (cardElements.length === 0) return;

    // Kill previous animations
    if (animationRef.current) {
      animationRef.current.cleanup?.();
      animationRef.current.scrub?.kill();
      animationRef.current.seamlessLoop?.kill();
      animationRef.current.draggable?.[0]?.kill();
      gsap.set(cardElements, { clearProps: 'all' });
    }

    let iteration = 0;
    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);

    // Set initial state
    gsap.set(cardElements, { xPercent: spread, opacity: 0, scale: 0 });

    const animateFunc = (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.in',
          immediateRender: false,
        }
      ).fromTo(
        element,
        { xPercent: spread },
        { xPercent: -spread, duration: 1, ease: 'none', immediateRender: false },
        0
      );
      return tl;
    };

    const seamlessLoop = buildSeamlessLoop(cardElements, spacing, animateFunc);
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    const playhead = { offset: 0 };

    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: 'power3',
      paused: true,
    });

    const scrollToOffset = (offset) => {
      const snappedTime = snapTime(offset);
      const progress =
        (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
      if (progress >= 1 || progress < 0) {
        iteration += Math.floor(progress);
      }
      scrub.vars.offset = snappedTime;
      scrub.invalidate().restart();
    };

    const container = containerRef.current;

    // Draggable — capture playhead.offset (actual position) not scrub.vars.offset (target)
    const draggable = Draggable.create(dragProxyRef.current, {
      type: 'x',
      trigger: cardsRef.current,
      onPress() {
        scrub.pause();
        this.startOffset = playhead.offset;
      },
      onDrag() {
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
        scrub.invalidate().restart();
      },
      onDragEnd() {
        scrollToOffset(scrub.vars.offset);
      },
    });

    // Next/Prev button handlers
    const nextBtn = container?.querySelector('.carousel-nav-next');
    const prevBtn = container?.querySelector('.carousel-nav-prev');
    const handleNext = () => scrollToOffset(scrub.vars.offset + spacing);
    const handlePrev = () => scrollToOffset(scrub.vars.offset - spacing);
    nextBtn?.addEventListener('click', handleNext);
    prevBtn?.addEventListener('click', handlePrev);

    // Store for cleanup
    animationRef.current = {
      scrub,
      seamlessLoop,
      draggable,
      cleanup: () => {
        nextBtn?.removeEventListener('click', handleNext);
        prevBtn?.removeEventListener('click', handlePrev);
      },
    };

    return () => {
      scrub.kill();
      seamlessLoop.kill();
      draggable[0]?.kill();
      animationRef.current?.cleanup();
    };
  }, [childCount, cardSelector, spread, buildSeamlessLoop]);

  if (childCount === 0) return null;

  return (
    <div className="relative w-full select-none" ref={containerRef}>
      <div className={`relative w-full overflow-hidden ${galleryClassName}`}>
        <ul
          className={`absolute left-1/2 top-[38%] m-0 -translate-x-1/2 -translate-y-1/2 list-none p-0 ${cardsClassName}`}
          ref={cardsRef}
        >
          {children}
        </ul>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center gap-5">
          <button
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="carousel-nav-prev flex size-10 cursor-pointer items-center justify-center rounded-full border border-yellow-500/30 bg-gray-800/80 text-yellow-400 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-yellow-500/60 hover:bg-yellow-500/15 active:scale-95"
            aria-label="Previous"
          >
            <Icon icon="ARROW" className="w-7 rotate-90" pathFill="currentColor" />
          </button>
          <div className="text-[0.7rem] uppercase tracking-[0.15em] text-gray-400/50">
            Drag or swipe
          </div>
          <button
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="carousel-nav-next flex size-10 cursor-pointer items-center justify-center rounded-full border border-yellow-500/30 bg-gray-800/80 text-yellow-400 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-yellow-500/60 hover:bg-yellow-500/15 active:scale-95"
            aria-label="Next"
          >
            <Icon icon="ARROW" className="w-7 -rotate-90" pathFill="currentColor" />
          </button>
        </div>
      </div>
      <div className="invisible absolute" ref={dragProxyRef} />
    </div>
  );
};

CardCarousel.propTypes = {
  cardSelector: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  spread: PropTypes.number,
  galleryClassName: PropTypes.string,
  cardsClassName: PropTypes.string,
};

export default CardCarousel;
