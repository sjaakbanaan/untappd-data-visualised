import Icon from '../../UI/Icon/Icon';
import { useEffect, useId, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { buildLiquidPath } from './buildLiquidPath';
import { DRAIN_DURATION, FILL_DURATION, POINTER_LAG } from './navAnimationConstants';

const WAVE_ANGLE_DURATION = 3;
const BUBBLES = [
  { x: 16, size: 5, duration: 2.6, delay: -0.2, drift: 8 },
  { x: 31, size: 3, duration: 2.1, delay: -1.1, drift: -6 },
  { x: 47, size: 4, duration: 2.9, delay: -1.7, drift: 10 },
  { x: 64, size: 6, duration: 3.2, delay: -0.8, drift: -8 },
  { x: 78, size: 3, duration: 2.4, delay: -1.9, drift: 5 },
  { x: 89, size: 4, duration: 2.7, delay: -0.5, drift: -7 },
];

const DashboardNavButton = ({
  sectionKey,
  label,
  icon,
  isActive,
  onSelect,
  waveDelayNorm = 0,
}) => {
  const buttonRef = useRef(null);
  const fillRootRef = useRef(null);
  const liquidPathRef = useRef(null);
  const waveDriverRef = useRef({ angle: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const hoverTlRef = useRef(null);
  const [isHot, setIsHot] = useState(false);
  const rawId = useId();
  const gradId = `beer-liquid-grad-${rawId.replace(/:/g, '')}`;
  const labelColorTransitionStyle = { transitionDuration: `${FILL_DURATION}s` };

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const paintLiquid = () => {
    const path = liquidPathRef.current;
    if (!path) return;
    const { angle } = waveDriverRef.current;
    const { x: px, y: py } = pointerRef.current;
    path.setAttribute('d', buildLiquidPath(angle, px, py));
  };

  const tweenPointerTo = (nx, ny) => {
    gsap.to(pointerRef.current, {
      x: nx,
      y: ny,
      duration: POINTER_LAG,
      ease: 'power4.out',
      overwrite: 'auto',
      onUpdate: paintLiquid,
    });
  };

  const killHoverTimeline = () => {
    hoverTlRef.current?.kill();
    hoverTlRef.current = null;
  };

  const handlePointerMove = (event) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    const nx = ((event.clientX - r.left) / r.width) * 2 - 1;
    const ny = -(((event.clientY - r.top) / r.height) * 2 - 1);
    tweenPointerTo(Math.max(-1, Math.min(1, nx)), Math.max(-1, Math.min(1, ny)));
  };

  const resetPointer = () => {
    gsap.killTweensOf(pointerRef.current);
    gsap.to(pointerRef.current, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: paintLiquid,
    });
  };

  useEffect(() => {
    const root = fillRootRef.current;
    const driver = waveDriverRef.current;
    const pointer = pointerRef.current;
    if (!root) return;
    gsap.set(root, { height: '0%' });
    gsap.set(pointer, { x: 0, y: 0 });
    paintLiquid();
    return () => {
      killHoverTimeline();
      gsap.killTweensOf(root);
      gsap.killTweensOf(driver);
      gsap.killTweensOf(pointer);
    };
  }, []);

  const animateFill = (full) => {
    const root = fillRootRef.current;
    const driver = waveDriverRef.current;
    if (!root) return;

    killHoverTimeline();
    gsap.killTweensOf(root);
    gsap.killTweensOf(driver);
    gsap.killTweensOf(pointerRef.current);

    if (!full) {
      resetPointer();
      gsap.to(root, {
        height: '0%',
        duration: DRAIN_DURATION,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(driver, { angle: 0 });
          gsap.set(pointerRef.current, { x: 0, y: 0 });
          paintLiquid();
        },
      });
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(root, { height: '100%' });
      gsap.set(driver, { angle: 0 });
      gsap.set(pointerRef.current, { x: 0, y: 0 });
      paintLiquid();
      return;
    }

    const delay = waveDelayNorm * 1.5;
    gsap.set(driver, { angle: 0 });
    paintLiquid();

    const tl = gsap.timeline();
    hoverTlRef.current = tl;

    tl.to(
      root,
      {
        height: '100%',
        duration: FILL_DURATION,
        ease: 'power1.inOut',
      },
      0
    );

    tl.to(
      driver,
      {
        angle: Math.PI * 2,
        ease: 'none',
        duration: WAVE_ANGLE_DURATION,
        repeat: -1,
        onUpdate: paintLiquid,
      },
      delay
    );
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onSelect(sectionKey)}
      onMouseEnter={(event) => {
        setIsHot(true);
        animateFill(true);
        handlePointerMove(event);
      }}
      onMouseLeave={() => {
        setIsHot(false);
        animateFill(false);
      }}
      onMouseMove={handlePointerMove}
      onFocus={() => {
        setIsHot(true);
        animateFill(true);
      }}
      onBlur={() => {
        setIsHot(false);
        animateFill(false);
      }}
      className={`relative mb-0 flex items-center justify-center overflow-hidden rounded border px-4 py-2 text-lg shadow transition-[color,background-color] duration-300 md:px-10 md:py-4 ${
        isActive ? 'border-white bg-gray-800' : 'border-gray-600 bg-gray-900'
      }`}
    >
      <span
        ref={fillRootRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden rounded-[inherit]"
      >
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient
              id={gradId}
              x1="0"
              y1="100"
              x2="0"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>
          <path
            ref={liquidPathRef}
            fill={`url(#${gradId})`}
            d={buildLiquidPath(0, 0, 0)}
          />
        </svg>
        {BUBBLES.map(({ x, size, duration, delay, drift }) => (
          <span
            key={`${x}-${size}`}
            className="dashboard-nav-bubble"
            style={{
              '--bubble-x': `${x}%`,
              '--bubble-size': `${size}px`,
              '--bubble-duration': `${duration}s`,
              '--bubble-delay': `${delay}s`,
              '--bubble-drift': `${drift}px`,
            }}
          />
        ))}
      </span>
      <span
        style={labelColorTransitionStyle}
        className="relative z-10 flex items-center justify-center transition-colors"
      >
        <Icon
          icon={icon}
          style={labelColorTransitionStyle}
          className={`mr-2 w-5 transition-colors ${
            isHot
              ? 'fill-gray-950 text-gray-950'
              : isActive
                ? 'fill-yellow-500 text-yellow-500'
                : 'fill-white text-white'
          }`}
        />
        <span
          style={labelColorTransitionStyle}
          className={`transition-colors ${
            isHot ? 'text-gray-950' : isActive ? 'text-gray-100' : 'text-white'
          }`}
        >
          {label}
        </span>
      </span>
    </button>
  );
};

export default DashboardNavButton;
