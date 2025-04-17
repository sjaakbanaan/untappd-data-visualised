import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataContext } from '../../DataContext';
import Dashboard from '../Dashboard/Dashboard';
import Uploader from '../Uploader/Uploader';
import SharedStats from '../SharedStats/SharedStats';

const AppRoutes = () => {
  const { beerData } = useContext(DataContext);

  return (
    <Routes>
      <Route
        path="/"
        element={beerData && beerData.length > 0 ? <Dashboard /> : <Uploader />}
      />
      <Route path="/upload" element={<Uploader />} />
      <Route path="/shared/:id" element={<SharedStats />} />
    </Routes>
  );
};

export default AppRoutes;
