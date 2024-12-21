/* eslint-disable no-console */
import { useContext } from 'react';
import ReactGA from 'react-ga4';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataContext } from './DataContext';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Uploader from './components/Uploader/Uploader.jsx';

const App = () => {
  // Initialize React Ga with your tracking ID
  const gtmCode = process.env.REACT_APP_GTM_CODE || 'G-SFBLBDE0LG';

  try {
    ReactGA.initialize(gtmCode);
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
  const { beerData } = useContext(DataContext);
  return (
    <Router>
      <Header />
      <div className="mx-1 md:mx-6">
        <Routes>
          <Route
            path="/"
            element={beerData && beerData.length > 0 ? <Dashboard /> : <Uploader />}
          />
          <Route path="/upload" element={<Uploader />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
