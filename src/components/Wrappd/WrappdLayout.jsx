import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WrappdTopStats from './WrappdTopStats';
import WrappdHeader from './WrappdHeader';
import WrappdStats from './WrappdStats';
import WrappdPhotos from './WrappdPhotos';
import WrappdFooter from './WrappdFooter';
import ScrollReveal from './ScrollReveal';
import gsap from 'gsap';

const WrappdLayout = ({
  userName,
  userAvatar,
  dateRange,
  stats,
  topLists,
  filterOverview,
}) => {
  // Create a ref for the container to apply 3D effects
  const containerRef = useRef(null);
  // Find the list of top beers which will be used for photos
  const photosList = topLists.find((item) => item.title === 'Top 5 beers');

  useEffect(() => {
    const container = containerRef.current;

    // Only apply 3D effect on desktop (screens wider than 768px)
    if (window.innerWidth < 768) return;

    /**
     * Handles mouse movement to create a 3D tilt effect
     * Calculates rotation based on mouse position relative to container center
     */
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation angles (divided by 200 to make the effect subtle)
      const rotateX = (y - centerY) / 100;
      const rotateY = (centerX - x) / 100;

      // Animate the container rotation using GSAP
      gsap.to(container, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 2000,
      });
    };

    /**
     * Resets the container rotation when mouse leaves
     */
    const handleMouseLeave = () => {
      gsap.to(container, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power2.out',
      });
    };

    // Add event listeners for mouse movement
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup: remove event listeners when component unmounts
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="pb-12 pt-4 md:py-20">
      {/* Main container with 3D transform effect */}
      <div
        ref={containerRef}
        className="transform-3d container mx-auto max-w-screen-md overflow-hidden bg-gray-900 px-4 py-8 shadow-2xl shadow-gray-950 transition-transform duration-1000 ease-out md:rounded-3xl md:p-10"
      >
        {/* Header section with user info and date range */}
        <ScrollReveal>
          <WrappdHeader
            userName={userName}
            userAvatar={userAvatar}
            dateRange={dateRange}
            filterOverview={filterOverview}
          />
        </ScrollReveal>

        {/* Statistics section */}
        <ScrollReveal>
          <WrappdStats stats={stats} dateRange={dateRange} />
        </ScrollReveal>

        {/* Photos section showing top beers */}
        <ScrollReveal>
          <WrappdPhotos photosList={photosList} />
        </ScrollReveal>

        {/* Top lists section (beers, breweries, venues, etc.) */}
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

        {/* Footer section */}
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
