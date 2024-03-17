import classNames from 'classnames';
import Select from 'react-select';
import countriesData from '../../countries.json';

const OverviewFilter = ({ label, labelPlural, options, onChange, translate }) => {
  // Function to translate country names
  const translateToEnglish = (originalName) => {
    const country = countriesData.countries.find((c) => c.original === originalName);
    return country ? country.english : originalName;
  };
  // Format options for react-select
  const selectOptions = options.map((option) => ({
    label: translate ? translateToEnglish(option) : option,
    value: option,
  }));
  return (
    <div>
      <label htmlFor={labelPlural} className="block text-white text-sm font-bold mb-2">
        Filter by {label}
      </label>
      <Select
        id={labelPlural}
        placeholder="Select an option..."
        options={selectOptions}
        onChange={(selectedOption) =>
          onChange(selectedOption ? selectedOption.value : null)
        } // Handle null value
        isClearable
        isSearchable
        unstyled
        classNames={{
          clearIndicator: () => classNames('p-2'),
          control: ({ isFocused }) =>
            classNames(
              'bg-gray-900',
              'rounded',
              'border-solid',
              'border',
              isFocused && 'shadow-[0_0_0_1px] shadow-black'
            ),
          dropdownIndicator: () => classNames('text-white', 'p-2'),
          indicatorSeparator: () => classNames('bg-white', 'my-2'),
          input: () => classNames('m-0.5', 'py-0.5', 'text-white'),
          noOptionsMessage: () => classNames('text-yellow-400', 'py-2', 'px-3'),
          option: () =>
            classNames(
              'bg-gray-900',
              'border-white',
              'hover:text-white',
              'hover:bg-yellow-600',
              'py-2',
              'px-3'
            ),
          placeholder: () => classNames('text-white', 'mx-0.5'),
          valueContainer: () => classNames('py-0.5', 'px-2'),
        }}
      />
    </div>
  );
};

export default OverviewFilter;
