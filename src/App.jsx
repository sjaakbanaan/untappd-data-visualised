/* eslint-disable no-console */
import ReactGA from 'react-ga4';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './components/AppContent/AppContent';

const App = () => {
  // Initialize React Ga with your tracking ID
  const gtmCode = import.meta.env.VITE_GTM_CODE;

  try {
    ReactGA.initialize(gtmCode);
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
