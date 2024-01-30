import PropTypes from 'prop-types';
import ICONS from './icons';

const Icon = ({ className = '', icon, size = 16, viewBox = '0 0 30 30' }) => (
  <svg
    style={{ width: `${size}px`, height: `${size}px` }}
    viewBox={viewBox}
    className={className || undefined}
  >
    <path d={ICONS[icon]} />
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
