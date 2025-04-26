/* eslint-disable no-console */
import ReactGA from 'react-ga4';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './components/AppContent';

const App = () => {
  // Initialize React Ga with your tracking ID
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  // Only initialize if we have a measurement ID
  if (gaMeasurementId) {
    try {
      ReactGA.initialize(gaMeasurementId, {
        testMode: process.env.NODE_ENV === 'test',
        gaOptions: {
          siteSpeedSampleRate: 100,
        },
      });
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
    }
  } else {
    console.warn('Google Analytics Measurement ID not found');
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
