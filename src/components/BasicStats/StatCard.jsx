import PropTypes from 'prop-types';

const StatCard = ({ statKey, value, suffix, suffixLink }) => {
  return (
    <li
      key={statKey}
      className="carousel-card absolute left-0 top-0 m-0 h-52 w-60 cursor-grab list-none overflow-hidden rounded-2xl active:cursor-grabbing md:h-60 md:w-72"
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="text-balance text-[0.95rem] font-bold uppercase leading-tight tracking-wider text-white/80 md:text-[1.05rem]">
          {statKey}
        </div>
        <div className="flex items-center justify-center">
          <div className="stat-value-gradient text-[2.75rem] font-extrabold leading-none md:text-[3.25rem]">
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </div>
        </div>
        {suffix && (
          <div className="text-xs text-gray-400/80">
            {suffixLink ? (
              <a
                href={suffixLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-400"
              >
                {suffix}
              </a>
            ) : (
              <span>{suffix}</span>
            )}
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
  suffixLink: PropTypes.string,
};

export default StatCard;
