import Icon from '../Icon/Icon';
import { useLocalStorageData } from '../../utils/';

const DashboardNav = ({ activeSection, setActiveSection }) => {
  const mapboxKey = useLocalStorageData('mapbox_key');
  const sections = [
    { key: 'stats', label: 'Stats', icon: 'STATS' },
    { key: 'charts', label: 'Charts', icon: 'CHART' },
    { key: 'checkins', label: 'Checkins', icon: 'UNTAPPD' },
  ];

  if (mapboxKey) {
    sections.push({ key: 'maps', label: 'Maps', icon: 'MAPS' });
  }

  return (
    <div className="mb-14 mt-4 flex flex-wrap gap-4 md:justify-center">
      {sections.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => setActiveSection(key)}
          className={`mb-0 flex items-center rounded border px-4 md:px-10 py-2 md:py-4 text-lg shadow transition-colors duration-300 ${
            activeSection === key
              ? 'border-yellow-500 bg-yellow-500 text-gray-900'
              : 'bg-gray-900 text-white hover:bg-gray-700'
          }`}
        >
          <Icon
            icon={icon}
            className={`mr-2 w-5 ${activeSection === key ? 'fill-gray-900' : 'fill-white'} `}
          />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default DashboardNav;
