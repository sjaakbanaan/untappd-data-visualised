import classNames from 'classnames';
import Select from 'react-select';

const OverviewFilter = ({
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
        options.flatMap((item) => item.split(',')).filter(Boolean) // This removes any empty strings that may occur from leading commas
      ),
    ].sort(); // Sorts the array alphabetically
  }

  // Format options for react-select
  const selectOptions = formattedOptions.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div>
      <label htmlFor={labelPlural} className="mb-2 block text-sm font-bold text-white">
        Filter by {label}
      </label>
      <Select
        id={labelPlural}
        placeholder="Choose.."
        options={selectOptions}
        onChange={(selectedOption) =>
          onChange(selectedOption ? selectedOption.value : null)
        } // Handle null value
        isClearable
        isSearchable
        value={value ? { label: value, value } : null} // handle null value
        unstyled
        classNames={{
          clearIndicator: () => classNames('p-2'),
          control: ({ isFocused }) =>
            classNames(
              'bg-gray-900',
              'rounded',
              'border',
              'hover:cursor-pointer',
              isFocused && 'shadow-[0_0_0_1px] shadow-black'
            ),
          dropdownIndicator: () => classNames('text-white', 'p-2'),
          indicatorSeparator: () => classNames('bg-white', 'my-2'),
          input: () => classNames('m-0.5', 'py-0.5', 'text-white'),
          noOptionsMessage: () =>
            classNames('bg-gray-900', 'border-white', 'py-2', 'px-3'),
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
          valueContainer: () => classNames('py-0.5', 'px-2'),
        }}
      />
    </div>
  );
};

export default OverviewFilter;
