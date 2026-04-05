import Icon from '../UI/Icon/Icon';
const FilterTag = ({ label, value, onClear, onClick, isPlaceholder }) => (
  <span
    onClick={onClick}
    className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-sm font-normal text-yellow-500 transition-colors hover:bg-yellow-500/20"
  >
    {label && <span className="text-gray-400">{label}:</span>}
    {isPlaceholder ? '[...]' : value}
    {onClear && !isPlaceholder && (
      <span
        onClick={onClear}
        className="ml-1 flex items-center justify-center rounded-full p-0.5 transition-transform duration-300 hover:rotate-90"
      >
        <Icon icon="CLOSE" className="w-2 fill-yellow-500" />
      </span>
    )}
  </span>
);
export default FilterTag;
