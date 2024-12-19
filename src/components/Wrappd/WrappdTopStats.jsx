const WrappdTopStats = ({ title, items, valueKey = 'value', suffix = '' }) => {
  if (items.length === 0) return null;

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="mt-10">
      <div className="-mt-4 mb-6 text-3xl font-bold text-wrappdYellow">{title}</div>
      <ul className="mb-10 marker:text-wrappdYellow">
        {items.map((item, i) => (
          <li className="my-2" key={i}>
            <div className="flex flex-row items-center justify-between">
              <div className="-mt-5 leading-none">
                {truncate(item.name || item.key, 54)}
              </div>
              <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center leading-none text-black">
                <div className="-mt-3 mb-2">
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
