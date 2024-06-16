import { formatDate } from '../../utils/index';
import Icon from '../Maps/Icon/Icon.jsx';

const OverviewCardProperty = ({
  icon,
  value,
  color = 'text-yellow-500',
  formatOutput,
  viewBox = '0 0 16 16',
  suffix,
}) => {
  return (
    <div className={`mb-2 flex ${color}`}>
      <Icon icon={icon} viewBox={viewBox} className="mr-2 mt-1 fill-yellow-500" />
      <div className="flex flex-1 items-center">
        {formatOutput ? formatDate(value) : value}
        {suffix && <div className="ml-2 text-xs">{suffix}</div>}
      </div>
    </div>
  );
};

export default OverviewCardProperty;
