import classNames from 'classnames';
import Select from 'react-select';
import statesData from '../../data/states.json';

// Function to translate state codes to names
const translateStates = (stateCode, statesData) => {
  const state = statesData.find((c) => c.code === stateCode);
  return state ? state.name : stateCode;
};

const OverviewFilter = ({
  filterKey,
  label,
  labelPlural,
  options,
  onChange,
  value,
  splitValues,
}) => {
  // In case the the returned option is an array, split up the values
  let formattedOptions = options;
  if (splitValues) {
    formattedOptions = [
      ...new Set(
        options
          .flatMap((item) => item.split(','))
          .map((s) => s.trim()) // strip leading/trailing spaces (scraper XL joins with ', ')
          .filter(Boolean) // This removes any empty strings that may occur from leading commas
      ),
    ].sort(); // Sorts the array alphabetically
  }

  // Format options for react-select
  const toOption = (option) => ({
    label: filterKey == 'brewery_state' ? translateStates(option, statesData) : option,
    value: option,
  });
  const selectOptions = formattedOptions.map(toOption);

  // Normalise the incoming value to an array of selected values
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <div>
      <label htmlFor={labelPlural} className="mb-2 block text-sm font-bold text-white">
        Filter by {label}
      </label>
      <Select
        id={labelPlural}
        placeholder="Choose.."
        options={selectOptions}
        isMulti
        onChange={(selectedOptions) =>
          onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])
        }
        isClearable
        isSearchable
        closeMenuOnSelect={false}
        value={selectedValues.map(toOption)}
        unstyled
        classNames={{
          clearIndicator: () => classNames('text-gray-600', 'p-2'),
          control: ({ isFocused }) =>
            classNames(
              'bg-gray-900',
              'rounded',
              'border',
              'border-gray-600',
              'hover:cursor-pointer',
              isFocused && 'shadow-[0_0_0_1px] shadow-black'
            ),
          dropdownIndicator: () => classNames('text-gray-600', 'p-2'),
          indicatorSeparator: () => classNames('bg-gray-600', 'my-2'),
          input: () => classNames('m-0.5', 'py-0.5', 'text-white'),
          noOptionsMessage: () =>
            classNames('bg-gray-900', 'border-gray-600', 'py-2', 'px-3'),
          option: () =>
            classNames(
              'bg-gray-800',
              'hover:text-gray-900',
              'hover:bg-yellow-500',
              'hover:border-yellow-500',
              'py-2',
              'px-3',
              'hover:cursor-pointer'
            ),
          placeholder: () => classNames('text-white', 'mx-0.5'),
          valueContainer: () =>
            classNames('py-0.5', 'px-2', 'text-yellow-500', 'gap-1', 'flex-wrap'),
          multiValue: () =>
            classNames(
              'bg-yellow-500/10',
              'border',
              'border-yellow-500/20',
              'rounded',
              'items-center',
              'my-0.5'
            ),
          multiValueLabel: () => classNames('py-0.5', 'pl-2', 'pr-1', 'text-yellow-500'),
          multiValueRemove: () =>
            classNames(
              'px-1',
              'self-stretch',
              'flex',
              'items-center',
              'rounded-r',
              'hover:bg-yellow-500',
              'hover:text-gray-900'
            ),
        }}
      />
    </div>
  );
};

export default OverviewFilter;
