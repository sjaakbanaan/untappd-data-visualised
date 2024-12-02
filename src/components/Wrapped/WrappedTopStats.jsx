const WrappedTopStats = ({ title, items, valueKey = 'value', suffix = '' }) => {
  if (items.length === 0) return null;

  return (
    <div className="w-full">
      {title && <h2 className="mb-2 font-bold">{title}</h2>}
      <ul className="mb-10">
        {items.map((item, i) => (
          <li key={i} className="my-2">
            <div className="flex items-center justify-between">
              {item.name || item.key}
              <span className="ml-10 whitespace-nowrap text-gray-400">
                {item[valueKey]}
                {suffix}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WrappedTopStats;
