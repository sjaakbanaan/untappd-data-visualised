import { formatDate } from '../utils';
import Icon from './Icon/Icon.jsx';

const OverviewCardPropery = ({
  icon,
  value,
  color = 'text-yellow-500',
  formatOutput,
}) => {
  return (
    <div className={`flex items-top mb-2 ${color}`}>
      <Icon icon={icon} viewBox="0 0 16 16" className="mr-2 mt-1 fill-yellow-500" />
      <div className="flex-1">{formatOutput ? formatDate(value) : value}</div>
    </div>
  );
};

export default OverviewCardPropery;
