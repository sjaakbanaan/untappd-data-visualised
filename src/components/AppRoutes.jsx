import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataContext } from '../DataContext';
import Dashboard from './Dashboard/Dashboard';
import Uploader from './Uploader/Uploader';
import Wrappd from './Wrappd/Wrappd';

const AppRoutes = () => {
  const { beerData } = useContext(DataContext);

  return (
    <Routes>
      <Route
        path="/"
        element={beerData && beerData.length > 0 ? <Dashboard /> : <Uploader />}
      />
      <Route path="/upload" element={<Uploader />} />
      <Route path="/wrappd/:id" element={<Wrappd />} />
    </Routes>
  );
};

export default AppRoutes;
