import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { setupScrollReveal } from '../../utils';

let componentIndex = 0;

const ScrollReveal = ({ children }) => {
  const elementRef = useRef(null);
  const currentIndex = useRef(componentIndex++);

  useEffect(() => {
    const element = elementRef.current;
    const index = currentIndex.current;
    return setupScrollReveal(element, index, componentIndex);
  }, []);

  return (
    <div ref={elementRef} className="invisible">
      {children}
    </div>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollReveal;
