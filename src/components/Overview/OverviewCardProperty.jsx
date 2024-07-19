import { formatDate } from '../../utils/index';
import Icon from '../Icon/Icon.jsx';

const OverviewCardProperty = ({
  icon,
  value,
  color = 'text-yellow-500',
  formatOutput,
  suffix,
}) => {
  return (
    <div className={`mb-2 flex ${color}`}>
      <Icon
        icon={icon}
        style={{ width: '16px', height: '16px' }}
        className="mr-2 mt-1 fill-yellow-500"
      />
      <div className="flex flex-1 items-center">
        {formatOutput ? formatDate(value) : value}
        {suffix && <div className="ml-2 text-xs">{suffix}</div>}
      </div>
    </div>
  );
};

export default OverviewCardProperty;
