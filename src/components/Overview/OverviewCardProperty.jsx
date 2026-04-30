import { formatDate } from '../../utils/index';
import Icon from '../UI/Icon/Icon';

const OverviewCardProperty = ({
  icon,
  secondIcon,
  secondValue,
  value,
  color = 'text-yellow-500',
  formatOutput,
  suffix,
}) => {
  return (
    <div className={`mb-2 flex ${color}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex">
          <Icon
            icon={icon}
            style={{ width: '16px', height: '16px' }}
            className="mr-2 mt-1 fill-yellow-500"
          />
          {formatOutput ? formatDate(value) : value}
          {suffix && <div className="ml-2 text-xs">{suffix}</div>}
        </div>
        <div className="flex">
          {secondIcon && (
            <Icon
              icon={secondIcon}
              style={{ width: '16px', height: '16px' }}
              className="mr-2 mt-1 fill-yellow-500"
            />
          )}
          {secondValue && secondValue}
        </div>
      </div>
    </div>
  );
};

export default OverviewCardProperty;
