const WrappdTopStats = ({ title, items, valueKey = 'value', suffix = '' }) => {
  if (items.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="mb-4 text-3xl font-bold text-wrappdYellow">{title}</div>
      <ul className="mb-10 marker:text-wrappdYellow">
        {items.map((item, i) => (
          <li className="my-2" key={i}>
            <div className="flex flex-row items-center justify-between">
              <div className="truncate">{item.name || item.key}</div>
              <div className="-mt-1 ml-3 rounded-xl bg-wrappdYellow px-2 py-1 text-center leading-none text-black">
                <div className="truncate">
                  {item[valueKey]}
                  {suffix}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WrappdTopStats;
