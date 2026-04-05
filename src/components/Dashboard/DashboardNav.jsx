import Icon from '../UI/Icon/Icon';
import { useContext } from 'react';
import { DataContext } from '../../DataContext';
import { useAuth } from '../../context/AuthContext';

const DashboardNav = ({ activeSection, setActiveSection }) => {
  const { userProfile } = useAuth();
  const mapboxKey = userProfile?.mapbox_key;
  const geminiApiKey = userProfile?.gemini_api_key;
  const { badgeData } = useContext(DataContext);

  const sections = [
    { key: 'stats', label: 'Stats', icon: 'STATS' },
    { key: 'charts', label: 'Charts', icon: 'CHART' },
    { key: 'checkins', label: 'Checkins', icon: 'UNTAPPD' },
  ];
  if (geminiApiKey) {
    sections.push({ key: 'ai', label: 'AI', icon: 'AI' });
  }
  if (mapboxKey) {
    sections.push({ key: 'maps', label: 'Maps', icon: 'MAPS' });
  }
  if (badgeData && badgeData.length > 0) {
    sections.push({ key: 'badges', label: 'Badges', icon: 'BADGE' });
  }

  return (
    <div className="mb-14 mt-4 flex flex-wrap gap-4 md:justify-center">
      {sections.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => setActiveSection(key)}
          className={`mb-0 flex items-center justify-center rounded border px-4 py-2 text-lg shadow transition-colors duration-300 md:px-10 md:py-4 text-white  hover:bg-gray-700 ${
            activeSection === key ? 'bg-gray-800 tex text-gray-900' : 'bg-gray-900'
          }`}
        >
          <Icon
            icon={icon}
            className={`mr-2 w-5 ${activeSection === key ? 'fill-yellow-500' : 'fill-white'}`}
          />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default DashboardNav;
