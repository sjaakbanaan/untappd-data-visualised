import { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DataContext } from '../../DataContext';
import Header from '../Header';
import Footer from '../Footer';
import Dashboard from '../Dashboard/Dashboard';
import Uploader from '../Uploader/Uploader';
import SharedStats from '../SharedStats/SharedStats';

const AppContent = () => {
  const location = useLocation();
  const { beerData } = useContext(DataContext);
  const isSharedRoute = location.pathname.startsWith('/shared');

  return (
    <>
      {!isSharedRoute && <Header />}
      <div className="mx-1 md:mx-6">
        <Routes>
          <Route
            path="/"
            element={beerData && beerData.length > 0 ? <Dashboard /> : <Uploader />}
          />
          <Route path="/upload" element={<Uploader />} />
          <Route path="/shared/:id" element={<SharedStats />} />
        </Routes>
        {!isSharedRoute && <Footer />}
      </div>
    </>
  );
};

export default AppContent;
