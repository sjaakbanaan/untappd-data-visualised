import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../DataContext';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from './AppRoutes';

const AppContent = () => {
  const location = useLocation();
  const isWrappdRoute = location.pathname.startsWith('/wrappd');
  const { isInitialized, firebaseLoading } = useContext(DataContext);

  // Show loading screen while Firebase is initializing
  if (!isInitialized || firebaseLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mb-4 text-xl font-bold text-white">Loading...</div>
          <div className="text-gray-400">Initializing data storage</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isWrappdRoute && <Header />}
      <div
        className={`${isWrappdRoute ? 'bg-gray-900 md:bg-wrappd-gradient' : 'px-1 md:px-6'}`}
      >
        <AppRoutes />
        {!isWrappdRoute && <Footer />}
      </div>
    </>
  );
};

export default AppContent;
