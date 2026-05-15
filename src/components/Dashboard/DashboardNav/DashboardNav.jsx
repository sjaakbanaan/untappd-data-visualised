import { useContext } from 'react';
import { DataContext } from '../../../DataContext';
import { useAuth } from '../../../context/AuthContext';
import DashboardNavButton from './DashboardNavButton';

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

  const waveNormMax = Math.max(sections.length - 1, 1);

  return (
    <div className="mb-14 mt-4 flex flex-wrap gap-4 md:justify-center">
      {sections.map(({ key, label, icon }, index) => (
        <DashboardNavButton
          key={key}
          sectionKey={key}
          label={label}
          icon={icon}
          isActive={activeSection === key}
          onSelect={setActiveSection}
          waveDelayNorm={sections.length > 1 ? index / waveNormMax : 0}
        />
      ))}
    </div>
  );
};

export default DashboardNav;
