import PropTypes from 'prop-types';

const StatCard = ({ statKey, value, suffix }) => {
  return (
    <li
      key={statKey}
      className="block overflow-hidden bg-gray-800 p-4 shadow-lg transition-transform duration-300 hover:scale-110 md:rounded-lg"
    >
      <div className="grid h-full grid-rows-auto-1fr text-center text-xl">
        <div className="mb-2 text-balance font-bold">{statKey}</div>
        <div className="flex items-center justify-center whitespace-nowrap">
          <div className="mb-1 text-4xl font-extrabold text-yellow-500 md:text-5xl">
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </div>
        </div>
        {suffix && (
          <div className="flex justify-center text-sm text-gray-500">
            <span>{suffix}</span>
          </div>
        )}
      </div>
    </li>
  );
};

StatCard.propTypes = {
  statKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  suffix: PropTypes.string,
};

export default StatCard;
