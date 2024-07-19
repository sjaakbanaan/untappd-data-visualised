import PropTypes from 'prop-types';
import ICONS from './icons';

const Icon = ({ icon, pathFill = '', ...props }) => {
  const iconData = ICONS[icon];
  if (!iconData) return null;
  const { path, viewBox } = iconData;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} {...props}>
      <path fill={pathFill} d={path} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  pathFill: PropTypes.string,
};

export default Icon;
