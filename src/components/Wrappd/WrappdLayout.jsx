import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WrappdTopStats from './WrappdTopStats';
import WrappdHeader from './WrappdHeader';
import WrappdStats from './WrappdStats';
import WrappdPhotos from './WrappdPhotos';
import WrappdFooter from './WrappdFooter';
import ScrollReveal from '../ScrollReveal';
import gsap from 'gsap';

const WrappdLayout = ({
  userName,
  userAvatar,
  dateRange,
  stats,
  topLists,
  filterOverview,
}) => {
  const containerRef = useRef(null);
  const photosList = topLists.find((item) => item.title === 'Top 5 beers');

  useEffect(() => {
    const container = containerRef.current;

    // Only add the effect if screen width is larger than 768px (md breakpoint)
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 200;
      const rotateY = (centerX - x) / 200;

      gsap.to(container, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 3000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(container, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="pb-12 pt-4 md:py-20">
      <div
        ref={containerRef}
        className="transform-3d container mx-auto max-w-screen-md overflow-hidden bg-gray-900 px-4 py-8 shadow-2xl shadow-gray-950 transition-transform duration-1000 ease-out md:rounded-3xl md:p-10"
      >
        <ScrollReveal>
          <WrappdHeader
            userName={userName}
            userAvatar={userAvatar}
            dateRange={dateRange}
            filterOverview={filterOverview}
          />
        </ScrollReveal>
        <ScrollReveal>
          <WrappdStats stats={stats} />
        </ScrollReveal>
        <ScrollReveal>
          <WrappdPhotos photosList={photosList} />
        </ScrollReveal>
        {topLists.map((topList, index) => (
          <ScrollReveal key={index}>
            <WrappdTopStats
              title={topList.title}
              items={topList.items.slice(0, 5)}
              valueKey={topList.valueKey}
              suffix={topList.suffix}
            />
          </ScrollReveal>
        ))}
        <ScrollReveal>
          <WrappdFooter />
        </ScrollReveal>
      </div>
    </div>
  );
};

WrappdLayout.propTypes = {
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      suffix: PropTypes.string,
    })
  ).isRequired,
  topLists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    })
  ).isRequired,
  filterOverview: PropTypes.object.isRequired,
};

export default WrappdLayout;
