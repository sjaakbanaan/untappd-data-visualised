import PropTypes from 'prop-types';

const StatCard = ({ statKey, value, suffix }) => {
  return (
    <li
      key={statKey}
      className="block overflow-hidden bg-gray-800 p-4 shadow-lg transition-transform duration-300 hover:scale-110 md:rounded-lg"
    >
      <div className="grid h-full grid-rows-auto-1fr text-center text-xl">
        <div className="font-bold text-balance mb-2">{statKey}</div>
        <div className="flex items-center justify-center whitespace-nowrap">
          <div className="text-4xl md:text-5xl mb-1 font-extrabold text-yellow-500">
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
