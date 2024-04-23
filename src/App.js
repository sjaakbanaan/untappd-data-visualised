import { useContext } from 'react';
import ReactGA from 'react-ga';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataContext } from './DataContext';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Uploader from './components/Uploader/Uploader.jsx';

const App = () => {
  // Initialize React Ga with your tracking ID
  ReactGA.initialize('G-SFBLBDE0LG');
  const { beerData } = useContext(DataContext);
  return (
    <Router>
      <div className="text-white">
        <Header />
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
